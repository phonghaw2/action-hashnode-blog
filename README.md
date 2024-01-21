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
| `TYPE` | Set this to `GIST` if you want to display latest posts in a pinned gists | `REPOSITORY` |
| `FILE` | Provide file location or provide **GIST ID** if `TYPE` set to `GIST` | `README.md` |
| `USERNAME` | Your Hashnode Username | - |
| `BLOG_URL` | Your blog url. you can leave it empty to auto generate. but if you are facing any issue with auto generated link. make sure to provide your blog url here. | - |
| `STYLE` | Options :  `list`, `list-ordered`, `blog`, `blog-right`, `blog-left`, `blog-alternate`, `blog-grid` | `list` |
| `COUNT` | No of latest posts to display | `6` |

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
          USERNAME: 'your-username' # Hashnode Username
          BLOG_URL: 'your-blog-url' # Blog URL
          COUNT: 10 # MAX Visisble
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```
<!-- END RAW -->

