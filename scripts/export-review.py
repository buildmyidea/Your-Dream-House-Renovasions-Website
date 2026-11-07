"""Export the current original design as an interactive HTML file and hostable ZIP."""

import argparse
import base64
import html
import json
import mimetypes
import re
import subprocess
from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile


def data_url(path):
    mime = mimetypes.guess_type(path.name)[0] or "application/octet-stream"
    return f"data:{mime};base64," + base64.b64encode(path.read_bytes()).decode()


def export(output):
    root = Path(__file__).resolve().parents[1]
    output.mkdir(parents=True, exist_ok=True)
    stylesheets = list((root / "dist/assets").glob("index-*.css"))
    if len(stylesheets) != 1:
        raise RuntimeError("Run npm run build before exporting the review files.")

    asset_paths = sorted(path for path in (root / "public/assets").iterdir() if path.is_file())
    pictures = {path.name: data_url(path) for path in asset_paths}
    content = (root / "src/content.js").read_text().replace("export const ", "const ")
    portable_content = content.replace("/assets/", "./assets/")
    image_expression = "url: `/assets/project-${String(id).padStart(2, '0')}.webp`, caption, alt,"
    embedded_expression = "url: reviewPictures[`project-${String(id).padStart(2, '0')}.webp`], caption, alt,"
    if content.count(image_expression) != 1:
        raise RuntimeError("The photograph catalogue changed; update the review exporter.")
    content = content.replace(image_expression, embedded_expression)
    for name, image_data in pictures.items():
        content = content.replace("/assets/" + name, image_data)

    rendered = subprocess.run(
        ["node", "--input-type=module", "-e", 'import { renderWebsite } from "./src/render.js"; process.stdout.write(renderWebsite());'],
        cwd=root, check=True, capture_output=True, text=True, encoding="utf-8",
    ).stdout
    if '<section class="opening"' not in rendered or 'id="transformations"' not in rendered:
        raise RuntimeError("The static page renderer did not produce the expected website sections.")
    portable_markup = rendered.replace("/assets/", "./assets/")
    for name, image_data in pictures.items():
        rendered = rendered.replace("/assets/" + name, image_data)

    main = (root / "src/main.js").read_text()
    main = re.sub(r"^import .*?;\n", "", main, flags=re.MULTILINE)
    render_call = "app.innerHTML = renderWebsite();"
    if main.count(render_call) != 1:
        raise RuntimeError("The application renderer changed; update the review exporter.")
    # The download already contains the complete page. Its script only binds controls.
    main = main.replace(render_call, "")

    def embed_font(match):
        value = match.group(1).strip("\"'")
        if value.startswith("/assets/"):
            path = root / "dist" / value.lstrip("/")
            if not path.is_file():
                raise RuntimeError(f"Missing built font: {path.name}")
            return 'url("' + data_url(path) + '")'
        return match.group(0)

    css = re.sub(r"url\(([^)]+)\)", embed_font, stylesheets[0].read_text())
    # Only gallery photos need a JavaScript catalogue. Large decorative artwork
    # and the logo are already embedded in the pre-rendered page.
    gallery_pictures = {name: value for name, value in pictures.items() if name.startswith("project-") and name != "project-00.webp"}
    script = "(() => {\n'use strict';\nconst reviewPictures=" + json.dumps(gallery_pictures, ensure_ascii=False) + ";\n" + content + "\n" + main + "\n})();"
    if "</script" in script.lower():
        raise RuntimeError("The review script contains an HTML closing delimiter.")
    page = (root / "index.html").read_text()
    # The complete page replaces the source entry's minimal no-script fallback.
    page = re.sub(r"\s*<noscript>.*?</noscript>", "", page, flags=re.DOTALL)
    shell = page
    app_entry = '<div id="app"></div>'
    if page.count(app_entry) != 1:
        raise RuntimeError("The application container changed; update the review exporter.")
    page = page.replace(app_entry, '<div id="app">' + rendered + '</div>')
    page = page.replace('href="/favicon.svg"', 'href="' + data_url(root / "public/favicon.svg") + '"')
    font_licences = (root / "public/font-licences.txt").read_text()
    font_notice = '<template id="font-licences">' + html.escape(font_licences) + '</template>'
    page = page.replace("</head>", font_notice + "<style>" + css + "</style></head>")
    entry = '<script type="module" src="/src/main.js"></script>'
    if page.count(entry) != 1:
        raise RuntimeError("The application entry changed; update the review exporter.")
    page = page.replace(entry, '<script>' + script + "</script>")
    interactive = output / "Your-Dream-Home-Interactive-Website.html"
    interactive.write_text(page, encoding="utf-8")
    standalone_index = output / "index.html"
    standalone_index.write_text(page, encoding="utf-8")

    # The review ZIP opens directly after extraction and needs no development server.
    portable_script = "(() => {\n'use strict';\n" + portable_content + "\n" + main + "\n})();"
    if "</script" in portable_script.lower():
        raise RuntimeError("The portable review script contains an HTML closing delimiter.")
    portable_page = shell.replace(app_entry, '<div id="app">' + portable_markup + '</div>')
    portable_page = portable_page.replace('href="/favicon.svg"', 'href="./favicon.svg"')
    portable_page = portable_page.replace("</head>", font_notice + "<style>" + css + "</style></head>")
    portable_page = portable_page.replace(entry, '<script>' + portable_script + "</script>")
    review_archive_path = output / "OPEN-WEBSITE.zip"
    with ZipFile(review_archive_path, "w", ZIP_DEFLATED) as archive:
        archive.writestr("index.html", portable_page)
        archive.write(root / "public/favicon.svg", "favicon.svg")
        archive.write(root / "public/font-licences.txt", "font-licences.txt")
        for path in asset_paths:
            archive.write(path, "assets/" + path.name)
        archive.writestr("READ-ME.txt", (
            "Your Dream Home Renovations\n\n"
            "Extract the ENTIRE ZIP, keeping index.html, favicon.svg and the assets folder together.\n"
            "Then double-click the extracted index.html to open the website in your browser.\n"
            "The package includes the page, styling, photographs and fonts. No installation or local server is required.\n"
            "The gallery and enquiry controls use JavaScript. The page content remains visible if scripts are blocked.\n"
            "Email enquiries open a draft in your email application for you to review and send.\n"
            "If a browser preview disables controls, download and extract the ZIP and open index.html in Chrome, Edge, Firefox or Safari.\n"
        ))
    with ZipFile(review_archive_path) as archive:
        if archive.testzip() is not None or archive.read("index.html") != portable_page.encode("utf-8"):
            raise RuntimeError("The direct-open website archive failed its integrity check.")
        for path in asset_paths:
            if archive.read("assets/" + path.name) != path.read_bytes():
                raise RuntimeError("A photograph is missing from the direct-open website archive.")

    archive_path = output / "your-dream-home-renovations-website.zip"
    with ZipFile(archive_path, "w", ZIP_DEFLATED) as archive:
        for path in sorted((root / "dist").rglob("*")):
            if path.is_file():
                archive.write(path, path.relative_to(root / "dist"))
        archive.writestr("START-HERE.txt", (
            "Your Dream Home Renovations\n\n"
            "This is the original website design with adapted client copy and a dedicated before-and-after section.\n"
            "Upload index.html, favicon.svg and the assets folder to a static web host's root directory.\n"
            "For local review, serve the extracted folder with a static web server.\n"
            "With Python installed, use py -m http.server 3000 on Windows or python3 -m http.server 3000 on macOS/Linux.\n"
            "Then open localhost on port 3000 in your browser.\n\n"
            "The enquiry form prepares an email draft for visitors to review and send in their email application.\n"
        ))
    with ZipFile(archive_path) as archive:
        if archive.testzip() is not None:
            raise RuntimeError("The website archive failed its integrity check.")
        for path in (root / "dist").rglob("*"):
            if path.is_file() and archive.read(str(path.relative_to(root / "dist"))) != path.read_bytes():
                raise RuntimeError("The website archive does not match the build.")
    print(f"Self-contained index.html: {standalone_index}")
    print(f"Interactive website: {interactive}")
    print(f"Extract and open index.html: {review_archive_path}")
    print(f"Hostable website ZIP: {archive_path}")
    print(f"Image assets embedded: {len(pictures)}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output-dir", type=Path, default=Path(__file__).resolve().parents[1] / "review")
    export(parser.parse_args().output_dir.resolve())
