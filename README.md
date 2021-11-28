# Website 2 PDF (website2pdf)

## Context

This tool aim to **print pages from a website into PDF files**.  
To achieve that, the website **must follow the [sitemap protocol](https://www.sitemaps.org/protocol.html)**.

*NB: this tool has been created originally to be able to print pages from a Hugo website, that's why the default value of the sitemap URL to check is **http://localhost:1313**.*

## How it works?

* Website2pdf will crawl the website based on the **sitemapUrl** option to retrieve all URLs that have to be printed
* Website2pdf will add header/footer in each file based on the **displayHeaderFooter** option, and use **header.html** and **footer.html** if found in the directory based on the **templateDir** option.
* Website2pdf will save all PDF file in the directory based on the **outputDir** option.

## How to use it?

### Installation

```sh
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

NB: Website2Pdf will search for header.html and footer.html files from the templateDir and use them respectively as
header and footer definition when printing PDFs.

Common options:
  -s, --sitemapUrl           Sitemap URL                         [string] [default: "http://localhost:1313/sitemap.xml"]
      --displayHeaderFooter  Turn on header and footer printing                               [boolean] [default: false]
  -t, --templateDir          Relative path of the templates directory                      [default: "./w2pdf_template"]
  -o, --outputDir            Relative path of the output directory                           [default: "./w2pdf_output"]

Other Options:
      --debug    Turn on debug logging                                                        [boolean] [default: false]
  -v, --version  Show version number                                                                           [boolean]
  -h, --help     Show help                                                                                     [boolean]

Examples:
  website2pdf --sitemapUrl "http://localhost:80/sitemap.xml"  Use specific sitemap URL
  website2pdf --displayHeaderFooter                           Print PDFs with header and footer
  website2pdf --templateDir "./templates"                     Use specific template directory
  website2pdf --outputDir "./output"                          Use specific output directory

Additional information:
  GitHub: https://github.com/jgazeau/website2pdf.git
  Documentation: https://github.com/jgazeau/website2pdf#readme
  Issues: https://github.com/jgazeau/website2pdf/issues
```

# Examples

```
$ npx website2pdf
2021-11-28 19:14:15.642  INFO 
●      __          __  _         _ _       ___  _____    _  __
●      \ \        / / | |       (_) |     |__ \|  __ \  | |/ _|
●       \ \  /\  / /__| |__  ___ _| |_ ___   ) | |__) |_| | |_
●        \ \/  \/ / _ \ '_ \/ __| | __/ _ \ / /|  ___/ _` |  _|
●         \  /\  /  __/ |_) \__ \ | ||  __// /_| |  | (_| | |
●          \/  \/ \___|_.__/|___/_|\__\___|____|_|   \__,_|_|
 
2021-11-28 19:14:16.053  INFO Printing 2 PDF(s) to w2pdf_output\fr 
2021-11-28 19:14:16.059  INFO Printing 2 PDF(s) to w2pdf_output\en
2021-11-28 19:14:31.562  INFO 
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

## Upcoming features

* Allow to override default configuration of the [Puppeteer page.pdf options](https://devdocs.io/puppeteer/index#pagepdfoptions)
* Feature to include more variables in header/footer
* Dockerfile to be able to generate PDF files from a CI/CD pipeline
