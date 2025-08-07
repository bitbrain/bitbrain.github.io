# 👉 [bitbra.in](https://bitbra.in)

![build-status](https://github.com/bitbrain/bitbrain.github.io/actions/workflows/github-pages.yml/badge.svg)

## About

This is my personal blog and portfolio website built with [Zola](https://www.getzola.org/), a fast static site generator written in Rust. The site uses the [Boring theme](https://github.com/emilyb7/zola-boring) for a clean, minimal design.

## Features

- **Fast Performance**: Built with Zola for lightning-fast build times
- **Modern Design**: Clean, responsive design using the Boring theme
- **GitHub Pages**: Automatically deployed via GitHub Actions
- **Custom Domain**: Hosted at [bitbra.in](https://bitbra.in)
- **Search**: Built-in search functionality
- **Syntax Highlighting**: Code blocks with syntax highlighting

## Local Development

### Prerequisites

- [Zola](https://www.getzola.org/documentation/getting-started/installation/) installed on your system

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/bitbrain/bitbrain.github.io.git
   cd bitbrain.github.io
   ```

2. Start the development server:
   ```bash
   zola serve
   ```

3. Open your browser and navigate to `http://127.0.0.1:1111`

### Building for Production

To build the site for production:

```bash
zola build
```

The built site will be in the `public/` directory.

## Deployment

The site is automatically deployed to GitHub Pages via GitHub Actions. The workflow:

- Triggers on pushes to the `master` branch
- Builds the site using Zola
- Deploys to the `gh-pages` branch
- Uses the existing `CUSTOM_GITHUB_TOKEN` for authentication

## Custom Domain Setup

If you want to learn how to set up your own blog with a custom domain, [I have written a blog post here](https://bitbra.in/2021/10/03/host-your-own-blog-for-free-with-custom-domain.html).

## License

This project is open source and available under the [MIT License](LICENSE).


