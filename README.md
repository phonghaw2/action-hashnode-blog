<p align="center">
    <a href="https://hashnode.com/">
        <img src="https://cdn.svarun.dev/common/hashnode/icon.png" width="150px"/>
    </a>
</p>

<h1 align="center">Hashnode Blogs - <i>Github Action</i></h1>
<p align="center">~ Fetch & Display Your Latest Blog Posts From <a href="https://hashnode.com/"><strong>Hashnode</strong></a> ~</p>

## ⚙️ Configuration
| Option | Description | Default |
| :---: | :---: | :---: |
| `BLOG_URL` | Your blog url. Example: blog.hashnode.dev  | - |
| `FILE` | Provide file location | `README.md` |
| `LIMIT` | Number of latest posts to display | `6` |
| `STYLE` | Options :  `list`, `list-ordered`, `blog`, `blog-right`, `blog-left`, `blog-grid` | `list` |

---
### Please check the [Demo Repository](https://github.com/varunsridharan/demo-action-hashnode-blog) to preview all possible **Styles**
---

## 🚀 Usage

### 💾  In Repository File
#### 1. Add The Below Content To Your README.md / Any file you want to showcase
```markdown
## My Latest Blog Posts 👇
<!-- HASHNODE_BLOG:START -->
<!-- HASHNODE_BLOG:END -->
```
#### 2. Configure The Worklfow
<!-- START RAW -->
```yaml
name: "📚 Blog Updater"

on:
  workflow_dispatch:
  schedule:
    - cron: '0 0 * * *' # Runs Every Day

jobs:
  update_blogs:
    name: "Update Blogs"
    runs-on: ubuntu-latest
    steps:
      - name: "📥  Fetching Repository Contents"
        uses: actions/checkout@main

      - name: "📚  Hashnode Updater"
        uses: "phonghaw2/action-hashnode-blog@main"
        with:
          BLOG_URL: 'your-blog-url' # dev-name.hashnode.dev
          LIMIT: 10 # MAX Visisble
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```
<!-- END RAW -->

