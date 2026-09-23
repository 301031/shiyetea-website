# 拾野茶集官网（SHIYE TEA）· 项目说明

> 课程：《网络营销推广》
> 任务：课内实践任务一 —— 虚拟电子商务公司成立与营销导向型网站搭建
> 品牌：拾野茶集 / SHIYE TEA
> 网站定位：营销导向型企业官网（获客 → 引流 → 转化 → 咨询 → 留存）

本目录是「拾野茶集」虚拟电子商务公司的官方网站，共 7 个页面，使用 HTML5 + CSS3 + 原生 JavaScript 编写，无任何付费插件、无外部接口、无需 API Key，双击 `index.html` 即可离线运行。

---

## 一、品牌与公司速览

| 项目 | 内容 |
| --- | --- |
| 公司名称 | 昆明拾野茶集电子商务有限公司 |
| 英文名称 | SHIYE TEA COLLECTIVE CO., LTD. |
| 品牌 Slogan | 把云南山头，装进你的杯子 |
| 辅助口号 | 真山头 · 真年份 · 真溯源 |
| 所属行业 | 食品饮料 / 茶叶及茶制品电商 |
| 经营模式 | B2C 自营电商 + 私域会员订阅（辅：B2B 企业定制） |
| 目标用户 | 25-40 岁都市轻养生人群，一二线城市白领，月可支配收入 8000-25000 元 |
| 品牌主色 | `#0F4C3A` 深墨绿（主）/ `#C9A227` 茶金（辅一）/ `#F7F3EA` 米白（辅二） |

---

## 二、目录结构

```
shiyetea-website/
├─ index.html            首页：主视觉、核心优势、产品轮播、爆款推荐、活动、CTA
├─ about.html            关于我们：公司介绍、企业理念、团队介绍、品牌优势
├─ products.html         产品中心：8 款产品、分类筛选、价格排序、查看详情
├─ product-detail.html   产品详情：主推「3 秒冷萃冻干茶粉」的完整决策页
├─ activity.html         营销活动：新客券、会员季卡、满减阶梯、三人拼团
├─ contact.html          联系我们：在线咨询、联系方式、地址、留言表单
├─ news.html             新闻动态：企业新闻、行业资讯、冲泡科普、SEO 文章
├─ robots.txt            搜索引擎抓取规则
├─ sitemap.xml           站点地图（7 个页面）
├─ css/
│  └─ style.css          全站样式：CSS 变量色板 + 响应式布局 + 组件样式
├─ js/
│  └─ main.js            全站交互：导航、轮播、筛选、图集、倒计时、表单校验等
└─ assets/
└─ images/            29 个原创 SVG 素材（另有 images/README.md 素材说明）
```

---

## 三、页面清单与承担任务

| 页面 | 承担的营销任务 | 关键模块 |
| --- | --- | --- |
| `index.html` | 获客与分流主入口 | 主视觉 + Slogan、四项核心优势、产品轮播、爆款推荐、限时活动、双 CTA、导航栏 |
| `about.html` | 建立信任、化解「新品牌不敢买」顾虑 | 公司介绍、企业理念、12 座茶山直采说明、四人团队介绍、品牌优势 |
| `products.html` | 承接流量、进入选购路径 | 8 款产品、分类筛选（生普 / 红茶 / 便捷茶 / 礼盒）、价格排序、卖点与价格、查看详情 |
| `product-detail.html` | 完成单个产品的说服与转化 | 高清展示区、规格参数、用户痛点、产品优势、使用场景、溯源信息、购买理由、咨询与立即购买 |
| `activity.html` | 活动驱动型转化 | 新客立减 20 元券、会员季卡直降 60 元、满减阶梯、三人拼团；含规则、时间、参与方式、倒计时 |
| `contact.html` | 咨询与线索留存 | 在线咨询入口、企业微信与公众号二维码、电话与邮箱、办公地址、留言表单 |
| `news.html` | SEO 内容获客与留存 | 8 篇文章（企业新闻 / 行业资讯 / 冲泡科普 / 营销干货），4 篇含完整正文 |

---

## 四、营销功能实现清单

**获客**
- 每页均布局关键词化的 `title` 与 `description`，配合 `sitemap.xml`、`robots.txt` 与结构化数据，服务自然搜索获客。
- `news.html` 以「云南春茶减产与价格走势」「滇红与生普工艺对比」等长尾话题承接搜索流量，并附站内文章目录入口。

**引流**
- 导航栏固定「立即咨询」入口；页面右下角常驻浮动咨询栏，滚动到任意位置都可一键发起咨询。
- 首页轮播 + 爆款推荐把访客从首页引导至 `products.html` 与 `product-detail.html`。
- 活动页券码支持一键复制（`SHIYE20` 新客券 / `SHIYEVIP60` 会员季卡券），降低参与门槛。

**转化**
- 三条转化路径：咨询型（咨询 → 茶顾问按口味推荐 → 下单）、自主购买型（筛选 → 详情 → 领券 → 购买）、活动驱动型（领券 / 拼团 → 凑单满减 → 下单）。
- 详情页固定「立即购买」与「立即咨询」双按钮，规格与数量可调，并给出 7 天无理由退换、48 小时发货等降低决策风险的信息。
- 活动页提供倒计时（截止 `2026-10-31 23:59:59`）、满减阶梯表与拼团玩法说明。

**咨询**
- 全站 `data-consult` 咨询按钮统一触发咨询动作；留言表单采集姓名、联系方式、意向产品与需求描述。
- 表单前端校验：必填项、手机号与邮箱格式，未通过时高亮并定位到第一个错误项；提交后生成本地记录与咨询编号（`SY` + 日期 + 4 位序号），数据存放在浏览器 `localStorage`，便于同一浏览器内核对。

**留存**
- `activity.html` 主推「茶山会员季卡 399 元」订阅制，明确不自动续费并提供暂停与退订规则。
- `news.html` 内容订阅入口，以茶知识维持未成交访客。
- 售后承诺（7 天无理由退换、已开罐可换同价产品一次）公开写在页脚与详情页，而非仅存在于客服话术。

---

## 五、SEO 实施要点

- **Meta 标题**：采用「核心词 + 卖点/价格 + 品牌」结构，例如首页 `拾野茶集官网_云南古树茶原叶茶电商品牌_山头茶一饼一码可溯源`。
- **Meta 描述**：每页 100-150 字，包含品牌、主推品类、价格带与行动引导（领券 / 咨询 / 定制）。
- **关键词布局**：首页覆盖「云南古树茶 / 原叶茶 / 山头茶 / 可溯源」；产品页覆盖「滇红 / 冻干茶粉 / 茶叶礼盒 / 价格」；详情页聚焦「冷萃冻干茶粉」「即溶茶粉」等精准长尾词；正文标题层级使用 `h1` → `h2` → `h3` 单一递进。
- **结构化数据**：首页 `Organization`、产品页与详情页 `Product`、活动页 `FAQPage`、联系页 `ContactPage`、新闻页 `Blog`。
- **图片**：全部使用 SVG 矢量图，体积小、加载快；所有 `img` 均填写了描述性 `alt`。
- **移动适配**：响应式断点 `1080px / 900px / 640px`，手机端导航自动折叠为抽屉菜单。

---

## 六、本地运行方式

无需安装任何环境、无需启动服务器：

1. 打开资源管理器，进入 `shiyetea-website` 文件夹；
2. 双击 `index.html`，浏览器即可打开网站；
3. 通过导航栏在 7 个页面之间正常跳转。

> 注意：请保证 `css/`、`js/`、`assets/` 三个目录与 HTML 文件保持同级，移动文件时请整目录一起移动，否则页面会丢失样式。

如需以网址形式访问（例如提交作业时贴链接、或小组内多人预览），可把整个 `shiyetea-website` 目录上传到任意免费静态托管并改名为站点根目录，例如 GitHub Pages、Gitee Pages、Netlify、Vercel、Cloudflare Pages。本网站是纯静态站点，不依赖后端与数据库，任何静态托管都能直接运行，**无需购买域名或付费主机**。

---

## 七、素材与自检脚本

站内 29 个 SVG 素材不是手工另存的文件，而是由脚本绘制生成，位于项目同级目录 `tools\`（即与 `shiyetea-website`、`submission-docs` 并列的文件夹）：

```powershell
# 先进入项目根目录（包含 shiyetea-website、submission-docs、tools 三个文件夹的那一层）
cd <项目根目录>

# 1) 修改色板或图形后，重新生成全部图片素材
node tools/gen-assets.js

# 2) 站点自检：检查死链接、锚点、重复 ID、图片 alt、SEO 基础项
node tools/check-site.js
```

- `tools/svg-lib.js` 集中保存品牌色板与公共图形，改一处即可全站生效。
- `tools/check-site.js` 会输出页面数量、链接检查结果与问题清单，可作为提交前的验收依据。
- 若拿到真实产品照片，替换方法见 `assets/images/README.md`。

---

## 八、虚拟数据声明

本网站是《网络营销推广》课程的实践成果，**全部内容均为教学演示数据**：

- 公司名称、统一社会信用代码、注册地址、联系电话、企业邮箱、ICP 备案号等均为虚拟信息，不代表任何真实登记或备案主体；
- 产品名称、价格、检测报告、会员规则、活动内容均为课程原创设计，不构成任何真实商品展示或销售要约；
- 企业微信与公众号二维码为图形占位，不可扫描；
- 页面图片均为团队原创绘制的 SVG 矢量图，未使用任何第三方受版权保护的图片素材。

---

## 九、GitHub Pages 部署

> **线上地址：** https://301031.github.io/shiyetea-website/
> **仓库地址：** https://github.com/301031/shiyetea-website
> **Pages 配置：** Source 为 `Deploy from a branch`，分支 `main`，目录 `/ (root)`

本站是纯静态站点，7 个页面的样式、脚本、图片全部使用**相对路径**引用（`css/style.css`、`js/main.js`、`assets/images/...`），没有以 `/` 开头的根路径引用。因此放在 GitHub Pages 的「项目站点」子路径（`https://<用户名>.github.io/shiyetea-website/`）下可以直接运行，**无需改写任何资源链接**。

### 9.1 仓库结构

把本目录（`shiyetea-website`）整体作为**仓库根目录**，让 `index.html` 位于仓库根，Pages 从根目录发布：

```
shiyetea-website/        ← 仓库根目录
├─ .nojekyll             关闭 Jekyll 处理，静态文件原样发布
├─ index.html            ← Pages 入口页
├─ about.html / products.html / product-detail.html / activity.html / contact.html / news.html
├─ robots.txt / sitemap.xml
├─ css/  js/  assets/
└─ README.md
```

### 9.2 首次部署

```bash
cd shiyetea-website
git init -b main
git add .
git commit -m "feat: 拾野茶集官网首版（7 页面静态站点）"
git remote add origin https://github.com/<用户名>/shiyetea-website.git
git push -u origin main
```

### 9.3 开启 Pages 并获取网址

在 GitHub 仓库页面进入 **Settings → Pages → Build and deployment**：

- Source 选择 `Deploy from a branch`
- Branch 选择 `main`，目录选择 `/ (root)`
- 点击 Save，等待约 1 分钟构建完成

访问地址为：

```
https://301031.github.io/shiyetea-website/
```

> 若希望网址不带项目名（直接 `https://<用户名>.github.io/`），把仓库命名为 `<用户名>.github.io` 即可，其余步骤相同。

### 9.4 域名配置（已完成）

页面 `canonical`、`og:image`、结构化数据以及 `sitemap.xml`、`robots.txt` 中的域名已统一指向本站真实域名 `https://301031.github.io/shiyetea-website/`。若日后更换域名或迁移仓库，可用下面的脚本批量改写：

```powershell
cd shiyetea-website
Get-ChildItem -Recurse -File -Include *.html,*.xml,*.txt | ForEach-Object {
  $c = Get-Content -Raw -LiteralPath $_.FullName
  $n = $c -replace '<原域名>', '<新域名>'
  if ($n -ne $c) { Set-Content -LiteralPath $_.FullName -Value $n -NoNewline; Write-Host "已更新 $($_.Name)" }
}
```

> 品牌邮箱 `service@shiyetea.example` 属于课程虚构演示信息，保持原样即可，不属于需要替换的域名。
