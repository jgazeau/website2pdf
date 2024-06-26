# Website 2 PDF (website2pdf)

## Context

This tool aims to **print pages from a website into PDF files**.  
To achieve that, the website **must follow the [sitemap protocol](https://www.sitemaps.org/protocol.html)**.

_NB: this tool was originally created to print pages from a Hugo website, that's why the default value of the sitemap URL to check is **http://localhost:1313**._

## How it works?

- Website2pdf will crawl the website based on the **sitemapUrl** option to retrieve all URLs that have to be printed
- Website2pdf will add header/footer in each file based on the **displayHeaderFooter** option, and use **header.html** and **footer.html** if found in the directory based on the **templateDir** option.
- Website2pdf will save all PDF file in the directory based on the **outputDir** option.
- Generated PDFs are named using the `<title>` html tag by default (unless specific option is used)

## How to use it?

### Installation

```Shell
npm install website2pdf
```

### Usage

```
●      __          __  _         _ _       ___  _____    _  __
●      \ \        / / | |       (_) |     |__ \|  __ \  | |/ _|
●       \ \  /\  / /__| |__  ___ _| |_ ___   ) | |__) |_| | |_
●        \ \/  \/ / _ \ '_ \/ __| | __/ _ \ / /|  ___/ _` |  _|
●         \  /\  /  __/ |_) \__ \ | ||  __// /_| |  | (_| | |
●          \/  \/ \___|_.__/|___/_|\__\___|____|_|   \__,_|_|

Usage: website2pdf [options]

NB1: Website2Pdf will search for header.html and footer.html files from the template-dir and use them respectively as
header and footer definition when printing PDFs.

NB2: Margins have default values depending on the option used:
===> when display-header-footer=true
-      margin-top  = margin-bottom = 50px
-      margin-left = margin-right  = 0px
===> when display-header-footer=false
-      margin-top  = margin-bottom = 0px
-      margin-left = margin-right  = 0px

Common options:
      --chromiumFlags, --chromium-flags                   Chromium flags set at Puppeteer launch                [string]
      --chromiumHeadless, --chromium-headless             Chromium headless option set at Puppeteer launch
                                                                                             [string] [default: "shell"]
      --displayHeaderFooter, --display-header-footer      Turn on header and footer printing  [boolean] [default: false]
      --excludeUrls, --exclude-urls                       Exclude urls matching a regex from printing process   [string]
      --format, --format                                  Set PaperFormat of generated PDF      [string] [default: "a4"]
      --marginBottom, --margin-bottom                     Margin bottom (50px or 0px)                           [string]
      --marginLeft, --margin-left                         Margin left                          [string] [default: "0px"]
      --marginRight, --margin-right                       Margin right                         [string] [default: "0px"]
      --marginTop, --margin-top                           Margin top (50px or 0px)                              [string]
      --mergeAll, --merge-all                             Merge all PDF generated into a single one (merged.pdf)
                                                                                                               [boolean]
  -o, --outputDir, --output-dir                           Relative path of the output directory
                                                                                             [default: "./w2pdf_output"]
      --outputFileNameUrlMap, --output-file-name-url-map  Output file name to URL map in JSON format
                                                          (urlToFileNameMap.json)                              [boolean]
      --processPool, --process-pool                       Pool of parallelized process            [number] [default: 10]
      --safeTitle, --safe-title                           Safely generate file title by replacing special chars
                                                                                              [boolean] [default: false]
      --serveSitemap, --serve-sitemap                     Serve local sitemap                                   [string]
  -s, --sitemapUrl, --sitemap-url                         Sitemap URL
                                                                 [string] [default: "http://localhost:1313/sitemap.xml"]
  -t, --templateDir, --template-dir                       Relative path of the templates directory
                                                                                           [default: "./w2pdf_template"]
      --urlTitle, --url-title                             Generate file title using last URL fragment
                                                                                              [boolean] [default: false]
      --waitUntil, --wait-until                           Comma-separated list of PuppeteerLifeCycleEvent used to wait
                                                          until specific event is fired on page
                                                                     [string] [default: "domcontentloaded,networkidle2"]

Other Options:
      --debug    Turn on debug logging                                                        [boolean] [default: false]
  -v, --version  Show version number                                                                           [boolean]
  -h, --help     Show help                                                                                     [boolean]

Examples:
  website2pdf --chromium-flags="--no-sandbox                    Use specific chromium options at Puppeteer launch
  --disable-dev-shm-usage"
  website2pdf --chromium-headless="true"                        Use specific chromium headless option at Puppeteer
                                                                launch
  website2pdf --display-header-footer                           Print PDFs with header and footer
  website2pdf --display-header-footer --margin-left="50px"      Use header and footer and set specific margins
  --margin-right="50px"
  website2pdf --exclude-urls="\/fr\/"                           Exclude urls of french language
  website2pdf --format="a3"                                     Set PaperFormat type
  website2pdf --merge-all                                       Merge all PDF generated into a single one (merged.pdf)
  website2pdf --output-dir="./output"                           Use specific output directory
  website2pdf --output-file-name-url-map                        Output file name to URL map in JSON format
                                                                (urlToFileNameMap.json)
  website2pdf --process-pool=20                                 Use specific count of parallelized process
  website2pdf --safe-title                                      Safely generate file title by replacing special chars
  website2pdf --serve-sitemap="sitemap.xml"                     Serve a local sitemap
  website2pdf --sitemap-url="http://localhost:80/sitemap.xml"   Use specific sitemap URL
  website2pdf --template-dir="./templates"                      Use specific template directory
  website2pdf --url-title                                       Generate file title using last URL fragment
  website2pdf --wait-until='domcontentloaded,networkidle0'      Wait until both domcontentloaded and networkidle0 events
                                                                are fired on page

Additional information:
  GitHub: https://github.com/jgazeau/website2pdf.git
  Documentation: https://github.com/jgazeau/website2pdf#readme
  Issues: https://github.com/jgazeau/website2pdf/issues
```

## Examples

### Default example

```
$ npx website2pdf
2022-01-01 00:00:00.000  INFO
●      __          __  _         _ _       ___  _____    _  __
●      \ \        / / | |       (_) |     |__ \|  __ \  | |/ _|
●       \ \  /\  / /__| |__  ___ _| |_ ___   ) | |__) |_| | |_
●        \ \/  \/ / _ \ '_ \/ __| | __/ _ \ / /|  ___/ _` |  _|
●         \  /\  /  __/ |_) \__ \ | ||  __// /_| |  | (_| | |
●          \/  \/ \___|_.__/|___/_|\__\___|____|_|   \__,_|_|

2022-01-01 00:00:00.000  INFO Printing 2 PDF(s) to w2pdf_output\fr
2022-01-01 00:00:00.000  INFO Printing 2 PDF(s) to w2pdf_output\en
2022-01-01 00:00:00.000  INFO
┌───────────────────────────────────────────────────────────────┐
│                   Results summary                             │
├─────────────────┬───────────────────────────────────┬─────────┤
│ URL             │ PDF file                          │ Status  │
├─────────────────┼───────────────────────────────────┼─────────┤
│ /               │ w2pdf_output/en/Homepage.pdf      │ PRINTED │
├─────────────────┼───────────────────────────────────┼─────────┤
│ /fr/            │ w2pdf_output/fr/Homepage.pdf      │ PRINTED │
├─────────────────┼───────────────────────────────────┼─────────┤
│ /first-page/    │ w2pdf_output/en/First_page.pdf    │ PRINTED │
├─────────────────┼───────────────────────────────────┼─────────┤
│ /fr/first-page/ │ w2pdf_output/fr/Première_page.pdf │ PRINTED │
└─────────────────┴───────────────────────────────────┴─────────┘
```

## How to use Header and Footer?

You can choose the page dimension / page size with the `--pageSize` option. The default size is `A4` but can be any [PaperFormat](https://pptr.dev/api/puppeteer.paperformat).

To include specific header and footer in PDF pages, two HTML files must be provided, named respectively **header.html** and **footer.html** (in **./w2pdf_template** by default).

Because of a [limitation in puppeteer](https://github.com/puppeteer/puppeteer/issues/1853), a default margin must be set (at least for top and bottom) to display headers and footers.

By default website2pdf is setting the following margins depending on the `displayHeaderFooter` option (these default values can be override using the `marginX` options of website2pdf):

- `displayHeaderFooter=false`
  ```
   ⬌ 0px      0px ⬌
  ┌──┬───────────┬───┐
  │  │           │   │⬍ 0px
  ├──┼───────────┼───┤
  │  │           │   │
  │  │           │   │
  │  │           │   │
  │  │           │   │
  ├──┼───────────┼───┤
  │  │           │   │⬍ 0px
  └──┴───────────┴───┘
  ```
- `displayHeaderFooter=true`
  ```
   ⬌ 0px      0px ⬌
  ┌──┬───────────┬───┐
  │  │           │   │⬍ 50px
  ├──┼───────────┼───┤
  │  │           │   │
  │  │           │   │
  │  │           │   │
  │  │           │   │
  ├──┼───────────┼───┤
  │  │           │   │⬍ 50px
  └──┴───────────┴───┘
  ```

The following types of configurations are available to expand header and footer:

- standard options of [headerTemplate and footerTemplate from Puppeteer](https://devdocs.io/puppeteer/index#pagepdfoptions)
- expanded variables from meta tags of HTML page:
  - Given the following HTML meta tag (using a `${META_KEY}` as a placeholder):
    ```
    <meta name="specificKey" content="A specific value">
    ```
    And the following header and/or footer template:
    ```
    ...
    <span>${specificKey}</span>
    ...
    ```
    The result template will be:
    ```
    ...
    <span>A specific value</span>
    ...
    ```
- images encoded as _base64_ from local files (:warning: only available for png files):
  - Given the following header and/or footer template (using a `${image:PATH}` as a placeholder):
    ```
    ...
    <image src="${image:./local_image_path/image.png}">
    ...
    ```
    The result template will be:
    ```
    ...
    <image src="data:image/png;base64,XXXXXXXXXXXXXX">
    ...
    ```
