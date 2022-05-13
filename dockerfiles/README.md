# Dockerfiles

This directory include some Dockerfile samples, helping you to run website2pdf in a container.

## [Dockerfile](./Dockerfile)

### Content
* alpine:edge based
* nodejs/npm
* chromium
* website2pdf binaries

### How to build the image?
```Shell
docker build \
       -t website2pdf \
       .
```

### Example

* Generate PDFs from a website's sitemap
    ```Shell
    npx website2pdf \
    --chromiumFlags="--no-sandbox" \
    --sitemapUrl <website_url>/sitemap.xml
    ```

## [Dockerfile_hugo](./Dockerfile_hugo)

#### Content
* alpine:edge based
* nodejs/npm
* chromium
* website2pdf binaries
* Hugo binaries

### How to build the image?
```Shell
docker build \
       --build-arg "HUGO_VERSION=X.X.X" \
       -t website2pdf \
       -f Dockerfile_hugo \
       .
```
⚠ Don't put the prefix `v` for the Hugo version ⚠

### Example

* Generate PDFs from a local Hugo website's sitemap
    1. Copy your Hugo website content in the `HUGO_WORKDIR`
    1. Start the Hugo embedded server as a brackground process
        ```Shell
        setsid nohup hugo serve > nohup.out &
        ```
    1. Generate the PDFs running `website2pdf`
        ```Shell
        npx website2pdf \
            --chromiumFlags="--no-sandbox"
        ```