/**
 * Site content, extracted from the previous portfolio
 * (https://phuong-full-stack.vercel.app/ — source: github.com/ThanhhPhuong2k2/FullStack_Engineer_Portfolio).
 *
 * Content only. No UI concerns (colors, icons styling, layout) live here.
 * Primary locale is vi_VN. English strings are kept because the old site was bilingual.
 * Items marked `TODO` need confirmation from the owner before launch.
 */

export type Locale = "vi" | "en";

export interface Localized<T = string> {
  vi: T;
  en: T;
}

export interface SeoMeta {
  siteUrl: string;
  title: Localized;
  description: Localized;
  /** Open Graph locale per page language. */
  ogLocale: Localized<"vi_VN" | "en_US">;
  /** hreflang value and URL path prefix per language. `vi` is the default at `/`. */
  hreflang: Localized<"vi" | "en">;
  pathPrefix: Localized<"" | "/en">;
  ogImage: { url: string; width: number; height: number };
}

export interface Education {
  school: Localized;
  major: string;
  graduationYear: string;
}

export interface Person {
  fullName: string;
  shortName: string;
  brand: string;
  role: Localized;
  heroEyebrow: Localized;
  tagline: Localized<{ before: string; highlight: string; after: string }>;
  location: Localized;
  /** Shown on the old hero badge as "02.01 / 2002". TODO: confirm it should stay public. */
  birthDate: string;
  portrait: { src: string; alt: Localized };
  cvUrl: string;
}

export interface SocialLink {
  id: "email" | "linkedin" | "github";
  label: Localized;
  value: string;
  href: string;
}

export type SkillCategory = "Frontend" | "Backend" | "Database" | "DevOps" | "Payments" | "Web3";

export interface Skill {
  name: string;
  category: SkillCategory;
  /** simpleicons.org slug when one exists; otherwise a logo URL is given in `logoUrl`. */
  iconSlug?: string;
  logoUrl?: string;
}

export interface Project {
  slug: string;
  title: string;
  subtitle: Localized;
  description: Localized;
  role: Localized;
  year: string;
  tags: string[];
  link?: string;
  linkExpired?: boolean;
  featured: boolean;
  cover: string;
  /**
   * A small copy of the cover for the grids (the projects wall, the projects page), when the cover's
   * host cannot resize it (performance audit). The cover stays the share image.
   */
  thumb?: string;
  gallery: string[];
  features: Localized<string[]>;
}

export interface Experience {
  company: string;
  role: Localized;
  period: { start: string; end: string | "present" };
  location: Localized;
  achievements: Localized<string[]>;
  /**
   * One short phrase per achievement, same order and length as `achievements` (shown first; the
   * full sentence opens under it). Drafted in the journey redesign, awaiting the owner's review.
   */
  highlights: Localized<string[]>;
  /** One short line for the job, shown on a phone in place of the longer text (draft, owner to review). */
  summary: Localized;
  tech: string[];
}

export interface JourneyStep {
  key: string;
  title: Localized;
  subtitle: string;
  description: Localized;
  /** `start` is omitted when the old site gave none. */
  period: { start?: string; end: string | "present" };
  /** One short line for the chapter, shown on a phone in place of the description (draft, owner to review). */
  summary?: Localized;
}

export interface NavItem {
  id: string;
  label: Localized;
}

export const seo: SeoMeta = {
  siteUrl: "https://phuong-full-stack.vercel.app",
  title: {
    // vi: translated from the old English title (the old site had only one). Confirm wording.
    vi: "Thanh Phương | Kỹ sư phần mềm Full-Stack",
    en: "Thanh Phuong | Full-Stack Software Engineer",
  },
  description: {
    // vi: faithful translation of the old English description. Confirm wording.
    vi: "Portfolio của Thanh Phương, Kỹ sư phần mềm Full-Stack có kinh nghiệm xây dựng ứng dụng web có khả năng mở rộng với React, Next.js, Node.js, TypeScript và các công nghệ backend hiện đại. Khám phá dự án, kỹ năng và kinh nghiệm làm việc.",
    en: "Portfolio of Thanh Phuong, a Full-Stack Software Engineer with experience building scalable web applications using React, Next.js, Node.js, TypeScript, and modern backend technologies. Explore projects, technical skills, and professional experience.",
  },
  ogLocale: { vi: "vi_VN", en: "en_US" },
  hreflang: { vi: "vi", en: "en" },
  pathPrefix: { vi: "", en: "/en" },
  ogImage: {
    url: "https://res.cloudinary.com/thanhphuongdev/image/upload/v1783936804/Screenshot_2026-07-13_165801_z65ck1.png",
    width: 1200,
    height: 630,
  },
};

export const person: Person = {
  fullName: "HO VAN THANH PHUONG",
  shortName: "Thanh Phuong",
  brand: "THANH PHUONG DEV",
  role: { vi: "Lập trình viên Fullstack", en: "Fullstack Developer" },
  heroEyebrow: { vi: "Kiến trúc sư Fullstack", en: "Fullstack Engineer" },
  tagline: {
    vi: {
      before: "Hướng tới trở thành một ",
      highlight: "Lập trình viên Fullstack xuất sắc",
      after:
        ", với mục tiêu xây dựng các sản phẩm mang giá trị thực tiễn và giải quyết hiệu quả những bài toán hệ thống phức tạp.",
    },
    en: {
      before: "Striving to become an ",
      highlight: "exceptional Fullstack Developer",
      after: ", aiming to build high-impact products and effectively solve complex systemic challenges.",
    },
  },
  location: { vi: "Đà Nẵng, Việt Nam", en: "Da Nang, Vietnam" },
  birthDate: "2002-01-02",
  portrait: {
    src: "https://res.cloudinary.com/thanhphuongdev/image/upload/v1769871580/480871455_1804998116709580_5147978810349798493_n_qyxuqm.jpg",
    alt: { vi: "Ảnh chân dung Hồ Văn Thanh Phương", en: "Portrait of Ho Van Thanh Phuong" },
  },
  cvUrl: "https://drive.google.com/file/d/1Ewc-RJCS7p8-bevq3UQ8HfnzvWln5rVV/view",
};

export const socials: SocialLink[] = [
  {
    id: "email",
    label: { vi: "Giao tiếp", en: "Communication" },
    value: "thanhphuong212002@gmail.com",
    href: "mailto:thanhphuong212002@gmail.com",
  },
  {
    id: "linkedin",
    label: { vi: "Mạng lưới", en: "Network" },
    value: "LinkedIn",
    href: "https://www.linkedin.com/in/ph%C6%B0%C6%A1ng-thanh-65240b2b8/",
  },
  {
    id: "github",
    label: { vi: "Kho lưu trữ", en: "Repository" },
    value: "ThanhhPhuong2k2",
    href: "https://github.com/ThanhhPhuong2k2",
  },
];

/**
 * Nav (owner's decision, Phase 3): four words; the logo goes home, so no "Home" word.
 * "Journey" now also holds the work experience (Phase 0, Q3 = merge).
 */
export const nav: NavItem[] = [
  { id: "projects", label: { vi: "Dự án", en: "Projects" } },
  { id: "skills", label: { vi: "Kỹ năng", en: "Skills" } },
  { id: "journey", label: { vi: "Hành trình", en: "Journey" } },
  { id: "contact", label: { vi: "Liên hệ", en: "Contact" } },
];

/** The name as shown in the logo and the close (vi with diacritics). */
export const displayName: Localized = { vi: "Thanh Phương", en: "Thanh Phuong" };

/** The full name with Vietnamese diacritics (the old site wrote it in capitals without them). */
export const fullNameDisplay: Localized = { vi: "Hồ Văn Thanh Phương", en: "Ho Van Thanh Phuong" };

/**
 * Hero (owner's decisions, Phase 4, second round, after the owner's reference picture): the
 * portrait in the middle, a large greeting above it, "I am Thanh Phuong" as the h1 bottom left,
 * the role bottom right, an availability pill and the speciality line from the old bio.
 * greeting and available are the owner's own words (chosen in the Phase 4 gate); the rest restates
 * the old site.
 */
export const hero = {
  greeting: { vi: "Xin chào", en: "Hey, there" },
  available: { vi: "Sẵn sàng cho cơ hội mới", en: "Available for new opportunities" },
  /** Two lines, as in the reference: the short line, then the name. */
  title: { vi: ["Tôi là", "Thanh Phương"], en: ["I am", "Thanh Phuong"] } satisfies Localized<readonly [string, string]> as Localized<readonly [string, string]>,
  /** The owner's own line (Phase 4); en is a translation of it. */
  speciality: {
    vi: "Kinh nghiệm phát triển các nền tảng Digital Assets, E-commerce và EdTech (TOEIC Learning), kết hợp tích hợp công nghệ Blockchain/Web3 và AI vào các sản phẩm thực tế.",
    en: "Experienced in building Digital Assets, E-commerce and EdTech (TOEIC learning) platforms, bringing Blockchain/Web3 and AI into real-world products.",
  },
  kicker: { vi: "Hồ Văn Thanh Phương · Đà Nẵng, Việt Nam", en: "Ho Van Thanh Phuong · Da Nang, Vietnam" },
  // TokenMall's 6,000+ users: given by the owner in the Phase 4 gate (not on the old site).
  proof: [
    { vi: "Ôn TOEIC: hơn 2,500 người dùng", en: "Ôn TOEIC: 2,500+ users" },
    { vi: "TokenMall: hơn 6,000 người dùng", en: "TokenMall: 6,000+ users" },
  ],
  /** The same two facts as `proof`, as figure + label (the contact's stats row). Keep them in step. */
  proofStats: [
    { value: "2,500+", label: { vi: "người dùng Ôn TOEIC", en: "Ôn TOEIC users" } },
    { value: "6,000+", label: { vi: "người dùng TokenMall", en: "TokenMall users" } },
  ],
  /**
   * The owner's studio portrait (public/assets/main.png, 870 x 880), its dark red backdrop keyed out
   * to a transparent cut-out (public/site/portrait.webp, 846 x 856).
   */
  portrait: {
    src: "/site/portrait.webp",
    width: 846,
    height: 856,
    alt: { vi: "Chân dung Hồ Văn Thanh Phương", en: "Portrait of Ho Van Thanh Phuong" },
  },
  /** Ôn TOEIC's own screen and its result card: no longer in the hero; kept for the Projects section. */
  art: {
    label: {
      vi: "Màn hình làm bài đọc TOEIC Part 7 trên Ôn TOEIC, với đáp án và lời giải thích",
      en: "A TOEIC Part 7 reading test on Ôn TOEIC, with the answer and its explanation",
    },
    windowTitle: "ontoeic.com",
    /**
     * Ôn TOEIC gallery: the Part 7 reading screen (2048 x 1054), cropped on Cloudinary to its right
     * pane (the question, the answers marked right and wrong, the explanation), so the window is
     * tall enough for the frame to cut it at the bottom as well as the right (layout.css collage).
     */
    screen: {
      src: "https://res.cloudinary.com/fqqdj43k/image/upload/c_crop,x_1000,y_0,w_1000,h_1054/v1785908417/726914633_27585944151056389_8875298119599664239_n_pdvo1g.jpg",
      width: 1000,
      height: 1054,
    },
    card: {
      title: "Ôn TOEIC",
      chip: { vi: "Từ 10/2025", en: "Since 10/2025" },
      lines: [
        { vi: "Hơn 2,500 người dùng", en: "2,500+ users" },
        { vi: "AI chấm phát âm và độ trôi chảy", en: "AI pronunciation and fluency feedback" },
        { vi: "Đấu từ vựng thời gian thực", en: "Real-time vocabulary challenges" },
      ],
    },
  },
} as const;

/** Interface strings (not content facts). */
export const ui = {
  skipLink: { vi: "Bỏ qua đến nội dung", en: "Skip to content" },
  mainNav: { vi: "Điều hướng chính", en: "Main" },
  menu: { vi: "Menu", en: "Menu" },
  switchLocale: { vi: "Xem bản tiếng Anh", en: "Xem bản tiếng Việt" },
  featured: { vi: "Tiêu biểu", en: "Featured" },
  moreProjects: { vi: "Dự án khác", en: "More projects" },
  latest: { vi: "Mới nhất", en: "Latest" },
  socials: { vi: "Mạng xã hội", en: "Social" },
  backHome: { vi: "Về trang chủ", en: "Back to home" },
  visitProject: { vi: "Xem dự án", en: "Visit project" },
  // The contact cards' copy button (owner's choice, contact redesign); the error line is a draft
  // awaiting the owner's review.
  copyEmail: { vi: "Sao chép email", en: "Copy email" },
  copied: { vi: "Đã sao chép", en: "Copied" },
  copyFailed: { vi: "Không sao chép được", en: "Couldn't copy" },
  // The journey's phone toggle (owner's ask: fewer words on a phone).
  seeMore: { vi: "Xem thêm", en: "See more" },
  seeLess: { vi: "Thu gọn", en: "Show less" },
  // the project page (owner's redesign; drafts awaiting the owner's review)
  overview: { vi: "Tổng quan dự án", en: "Project overview" },
  keyFeatures: { vi: "Tính năng nổi bật", en: "Key features" },
  screens: { vi: "Hình ảnh", en: "Screens" },
  year: { vi: "Năm", en: "Year" },
  role: { vi: "Vai trò", en: "Role" },
  stack: { vi: "Công nghệ", en: "Tech stack" },
  moreProjectsNav: { vi: "Dự án khác", en: "More projects" },
  openScreen: { vi: "Phóng to ảnh", en: "Enlarge screen" },
  closeViewer: { vi: "Đóng", en: "Close" },
  prevScreen: { vi: "Ảnh trước", en: "Previous screen" },
  nextScreen: { vi: "Ảnh sau", en: "Next screen" },
  viewAllScreens: { vi: "Xem tất cả ảnh", en: "View all screenshots" },
} satisfies Record<string, Localized>;

/** Section headings as written on the old site. */
export const sectionTitles = {
  projects: { vi: "Dự án tiêu biểu", en: "Featured projects" },
  allProjects: { vi: "Tất cả dự án", en: "All projects" },
  skills: { vi: "Kỹ năng", en: "Skills" },
  journey: { vi: "Hành trình", en: "My journey" },
  work: { vi: "Kinh nghiệm làm việc", en: "Work experience" },
  contact: { vi: "Hãy kết nối.", en: "Let's talk." },
} satisfies Record<string, Localized>;

export const ctas = {
  // Shortened from the old "Tải xuống CV" (owner's decision, Phase 3): fits the phone bar.
  downloadCv: { vi: "Tải CV", en: "Download CV" },
  viewProjects: { vi: "Xem dự án", en: "View projects" },
  viewAllProjects: { vi: "Xem tất cả dự án", en: "View all projects" },
  connect: { vi: "Kết nối ngay", en: "Establish link" },
} satisfies Record<string, Localized>;

export const skills: Skill[] = [
  { name: "ReactJS", category: "Frontend", iconSlug: "react" },
  { name: "Vite", category: "Frontend", iconSlug: "vite" },
  { name: "Next.js", category: "Frontend", iconSlug: "nextdotjs" },
  { name: "Tailwind CSS", category: "Frontend", iconSlug: "tailwindcss" },
  { name: "Ant Design", category: "Frontend", iconSlug: "antdesign" },
  { name: "Material UI", category: "Frontend", iconSlug: "mui" },
  { name: "Sass", category: "Frontend", iconSlug: "sass" },
  { name: "Bootstrap", category: "Frontend", iconSlug: "bootstrap" },
  { name: "React Redux", category: "Frontend", iconSlug: "redux" },
  { name: "React Query", category: "Frontend", iconSlug: "reactquery" },
  { name: "Axios", category: "Frontend", iconSlug: "axios" },
  { name: "Node.js", category: "Backend", iconSlug: "nodedotjs" },
  { name: "NestJS", category: "Backend", iconSlug: "nestjs" },
  { name: "Express.js", category: "Backend", iconSlug: "express" },
  { name: "OpenAI API", category: "Backend", iconSlug: "openai" },
  { name: "PostgreSQL", category: "Database", iconSlug: "postgresql" },
  { name: "Prisma", category: "Database", iconSlug: "prisma" },
  { name: "Redis", category: "Database", iconSlug: "redis" },
  { name: "SQL Server", category: "Database", iconSlug: "microsoftsqlserver" },
  { name: "MySQL", category: "Database", iconSlug: "mysql" },
  { name: "MongoDB", category: "Database", iconSlug: "mongodb" },
  { name: "Cloudinary", category: "DevOps", iconSlug: "cloudinary" },
  { name: "Kafka", category: "DevOps", iconSlug: "apachekafka" },
  { name: "Docker", category: "DevOps", iconSlug: "docker" },
  { name: "Socket.io", category: "DevOps", iconSlug: "socketdotio" },
  { name: "VNPay", category: "Payments" },
  {
    name: "VietQR",
    category: "Payments",
    logoUrl: "https://res.cloudinary.com/thanhphuongdev/image/upload/v1769887524/1280px-VietQR_Logo.svg_cdjwoj.png",
  },
  {
    name: "ACB",
    category: "Payments",
    logoUrl: "https://res.cloudinary.com/thanhphuongdev/image/upload/v1769887730/logo-acb-inkythuatso_s6e5ny.png",
  },
  { name: "Web3.js", category: "Web3", iconSlug: "web3dotjs" },
  { name: "Ethers.js", category: "Web3", iconSlug: "ethers" },
  {
    name: "Wagmi",
    category: "Web3",
    logoUrl: "https://res.cloudinary.com/thanhphuongdev/image/upload/v1769887863/logo-light_niqdll.svg",
  },
];

export const skillCategoryLabels: Record<SkillCategory, Localized> = {
  Frontend: { vi: "Frontend", en: "Frontend" },
  Backend: { vi: "Backend", en: "Backend" },
  Database: { vi: "Database", en: "Database" },
  DevOps: { vi: "DevOps", en: "DevOps" },
  Payments: { vi: "Thanh toán", en: "Payments" },
  Web3: { vi: "Web3", en: "Web3" },
};

/** Order matches the old site. `featured` = the 4 projects shown on the homepage. */
export const projects: Project[] = [
  {
    slug: "tokenmall",
    title: "TokenMall",
    subtitle: { vi: "Nền tảng Thương mại điện tử", en: "E-commerce Platform" },
    description: {
      vi: "TokenMall là nền tảng thương mại điện tử dành cho các sản phẩm đạt chứng nhận OCOP hoặc các tiêu chuẩn chất lượng tương đương. Hệ thống kết hợp thương mại điện tử với công nghệ blockchain thông qua Voucher NFT, đồng thời hỗ trợ quản lý Seller, Affiliate, nhiều phương thức thanh toán và tích hợp dịch vụ vận chuyển để mang đến trải nghiệm mua sắm hiện đại.",
      en: "TokenMall is an e-commerce platform dedicated to products with OCOP certification or equivalent quality standards. The system combines traditional e-commerce with blockchain technology through NFT Vouchers, while supporting Seller management, Affiliate programs, multiple payment methods, and shipping service integration to deliver a modern shopping experience.",
    },
    role: { vi: "Lập trình viên Fullstack", en: "Fullstack Developer" },
    year: "2024",
    tags: ["Kafka", "VNPay", "MongoDB", "Next.js", "Express.js"],
    // Kept as on the old site (owner's decision).
    link: "https://www.facebook.com/photo.php?fbid=122124721718526001&set=pb.61565780051514.-2207520000&type=3",
    featured: true,
    cover: "https://framerusercontent.com/images/byDMwTQuzggWNz6lB6z5LE5KpEA.png",
    gallery: [
      "https://framerusercontent.com/images/byDMwTQuzggWNz6lB6z5LE5KpEA.png",
      "https://framerusercontent.com/images/2WcBfaCxul9lkWllMPkQqPsTFw.png",
      "https://framerusercontent.com/images/1ujBIvH83QntgR4TAQCWsSlKMQM.png",
      "https://framerusercontent.com/images/xpBDFhaftMJqvOOu0Bo3xAY2uko.png",
      "https://res.cloudinary.com/fqqdj43k/image/upload/v1783706210/Thanh_to%C3%A1n_nhi%E1%BB%81u_shop_1_l%E1%BA%A7n_tyjqhd.png",
      "https://res.cloudinary.com/fqqdj43k/image/upload/v1783706210/Detail_s%E1%BA%A3n_ph%E1%BA%A9m_r54ojg.png",
      "https://res.cloudinary.com/fqqdj43k/image/upload/v1783706210/Qu%E1%BA%A3n_l%C3%BD_t%C3%A0i_kho%E1%BA%A3n_zys3fp.png",
      "https://res.cloudinary.com/fqqdj43k/image/upload/v1783706211/%C4%90%C4%83ng_k%C3%BD_b%C3%A1n_h%C3%A0ng_vn5shy.png",
      "https://res.cloudinary.com/fqqdj43k/image/upload/v1783706211/Qu%E1%BA%A3n_l%C3%BD_s%E1%BA%A3n_ph%E1%BA%A9m_lnfcv9.png",
      "https://res.cloudinary.com/fqqdj43k/image/upload/v1783706211/%C4%90%C6%A1n_h%C3%A0ng_c%E1%BB%A7a_t%C3%B4i_Ch%E1%BB%9D_x%C3%A1c_nh%E1%BA%ADn_l06rz9.png",
      "https://res.cloudinary.com/fqqdj43k/image/upload/v1783706214/Detail_s%E1%BA%A3n_ph%E1%BA%A9m1_ilqfob.png",
    ],
    features: {
      vi: [
        "Cơ sở hạ tầng thương mại điện tử bảo mật hỗ trợ hàng ngàn giao dịch hàng ngày",
        "Giỏ hàng động trực quan và trải nghiệm thanh toán nhiều bước tinh giản",
        "Triển khai API VNPAY chính thức với xử lý phản hồi webhook tức thời",
        "Tự động cập nhật kho hàng thời gian thực và ghi log kho hiệu năng cao",
        "Tích hợp hàng đợi tin nhắn mở rộng với Apache Kafka để phân phối đơn hàng bất đồng bộ",
      ],
      en: [
        "Secure e-commerce infrastructure supporting thousands of daily transactions",
        "Intuitive dynamic shopping cart and streamlined multi-step checkout experience",
        "Official VNPAY API implementation with instant webhook callback processing",
        "Automated real-time inventory adjustments and high-performance warehouse logs",
        "Scalable message queue integration with Apache Kafka for asynchronous order distribution",
      ],
    },
  },
  {
    slug: "thuc-pham-quang-da",
    // Renamed from "Thuc Pham Quang Da" (owner's decision). Slug kept for old links.
    title: "Thực Phẩm Quảng Đà",
    subtitle: { vi: "Dự án Freelance", en: "Freelance Project" },
    description: {
      vi: "Thực Phẩm Quảng Đà là nền tảng thương mại điện tử freelance được phát triển cho Quảng Đà Food, một nhà phân phối thực phẩm địa phương tại Đà Nẵng. Nền tảng cung cấp trải nghiệm mua sắm trực tuyến toàn diện, bao gồm quản lý sản phẩm, tồn kho, giỏ hàng, thanh toán, thanh toán trực tuyến và quản lý đơn hàng, giúp tinh giản vận hành doanh nghiệp và nâng cao trải nghiệm mua hàng của khách hàng.",
      en: "Thực Phẩm Quảng Đà is a freelance e-commerce platform developed for Quảng Đà Food, a local food distributor in Da Nang. The platform provides a complete online shopping experience, including product management, inventory, shopping cart, checkout, payment, and order management, helping streamline business operations and improve customer purchasing experience.",
    },
    role: { vi: "Lập trình viên Fullstack", en: "Fullstack Developer" },
    year: "2024",
    tags: ["Next.js", "NestJS", "PostgreSQL", "Prisma", "Tailwind", "Material UI"],
    link: "https://thucphamquangda.com/",
    featured: true,
    // The site's own home page (from its gallery), not the old illustrated cover (Phase 5).
    cover: "https://res.cloudinary.com/fqqdj43k/image/upload/v1783745077/Screenshot_2026-07-11_113823_uv86tw.png",
    // Old gallery also contained an Unsplash stock photo; dropped (not a project screenshot).
    gallery: [
      "https://res.cloudinary.com/dfbbhslan/image/upload/v1754148729/Copilot_20250802_223141_x6y7hk.png",
      "https://res.cloudinary.com/fqqdj43k/image/upload/v1783745077/Screenshot_2026-07-11_113823_uv86tw.png",
      "https://res.cloudinary.com/fqqdj43k/image/upload/v1783745076/Screenshot_2026-07-11_113915_psuk3c.png",
      "https://res.cloudinary.com/fqqdj43k/image/upload/v1783745075/image_sjamhr.png",
      "https://res.cloudinary.com/fqqdj43k/image/upload/v1783745074/image_1_hvzl5c.png",
      "https://res.cloudinary.com/fqqdj43k/image/upload/v1783745074/banner_profile_tu87l8.webp",
      "https://res.cloudinary.com/fqqdj43k/image/upload/v1783745077/image_3_w2vhvh.png",
    ],
    features: {
      vi: [
        "Giao diện người dùng sạch, chuyển đổi cao cho thực phẩm tươi sống và tuyển chọn ẩm thực",
        "Theo dõi kho thông minh giám sát ngày hết hạn và ngày lô sản xuất chính xác",
        "Thông báo ngưỡng tồn kho thấp tự động và hệ thống đặt hàng thông minh",
        "Trang tổng quan bảo mật cho nhà bán hàng quản lý nhập, xuất và phân tích hàng ngày",
        "Truy vấn PostgreSQL linh hoạt và mạnh mẽ mang lại báo cáo thời gian thực nhanh chóng",
      ],
      en: [
        "Clean high-converting user interfaces for fresh produce and culinary selection",
        "Intelligent inventory tracking monitoring precise expiration and batch dates",
        "Automatic low-stock threshold notifications and intelligent smart ordering system",
        "Secure dashboard for merchants to manage imports, exports, and daily analytics",
        "Flexible and robust PostgreSQL queries delivering fast real-time reporting",
      ],
    },
  },
  {
    slug: "lani",
    title: "LANI",
    subtitle: { vi: "Nền tảng Thương mại điện tử & Đào tạo", en: "E-Commerce & Training Platform" },
    description: {
      vi: "LANI là nền tảng thương mại điện tử và đào tạo chuyên nghiệp đa chức năng, hỗ trợ song ngữ (Việt - Anh). Hệ thống cung cấp giải pháp mua sắm các loại sản phẩm chất lượng cao, đăng ký khóa học đào tạo trực tuyến, tích hợp hệ thống xác thực tài khoản (đăng nhập / đăng ký), đánh giá phản hồi (feedback) khách hàng và thanh toán trực tuyến bảo mật, tiện lợi.",
      en: "LANI is a multifunctional e-commerce and training platform with full bilingual support (Vietnamese - English). The system offers high-quality product shopping, online training course enrollment, user authentication (Sign In / Sign Up), customer review & feedback workflows, and secure online payment processing.",
    },
    role: { vi: "Lập trình viên Fullstack", en: "Fullstack Developer" },
    year: "2025",
    tags: ["Next.js", "TypeScript", "NestJS", "PostgreSQL", "Tailwind CSS", "VNPay"],
    link: "https://www.lanivn.com/vi",
    featured: false,
    cover: "https://res.cloudinary.com/fqqdj43k/image/upload/v1790616392/Screenshot_2026-09-29_002522_ysyilo.png",
    gallery: ["https://res.cloudinary.com/fqqdj43k/image/upload/v1790616392/Screenshot_2026-09-29_002522_ysyilo.png"],
    features: {
      vi: [
        "Giao diện hiện đại, tối ưu SEO và hỗ trợ đa ngôn ngữ song ngữ Việt - Anh (i18n)",
        "Hệ thống quản lý xác thực người dùng bảo mật cao với chức năng đăng ký, đăng nhập và phân quyền",
        "Danh mục thương mại điện tử đa dạng với giỏ hàng động, thanh toán và xử lý đơn hàng trực tuyến",
        "Cổng đăng ký khóa học đào tạo chuyên nghiệp với lịch học, thông tin chi tiết và ghi danh tức thì",
        "Hệ thống thu thập đánh giá, phản hồi (feedback) khách hàng trực quan và quản lý tương tác",
        "Tích hợp cổng thanh toán trực tuyến bảo mật, hỗ trợ chuyển khoản và kiểm tra giao dịch tự động",
      ],
      en: [
        "Modern, high-performance interface with full bilingual localization (Vietnamese & English i18n)",
        "Secure user authentication architecture with streamlined sign-in, registration, and role management",
        "Versatile e-commerce product catalog with interactive shopping cart, checkout, and order tracking",
        "Professional training course enrollment portal with detailed syllabus, scheduling, and instant sign-up",
        "Interactive customer review and feedback system to boost user engagement and product transparency",
        "Seamless online payment integration ensuring fast, encrypted checkout and automated transaction reconciliation",
      ],
    },
  },
  {
    slug: "risegate-asset-tokenization-platform",
    title: "Risegate – Asset Tokenization Platform",
    subtitle: { vi: "Nền tảng Tokenization tài sản", en: "Asset Tokenization Platform" },
    description: {
      vi: "Risegate là nền tảng mã hóa tài sản cho phép doanh nghiệp số hóa và quản lý các tài sản thực tế trên blockchain. Nền tảng hỗ trợ phát hành tài sản, quản lý dự án, tích hợp ví bảo mật, xác thực KYC, xử lý thanh toán và theo dõi giao dịch trên blockchain nhằm mang lại một hệ sinh thái đầu tư minh bạch và an toàn.",
      en: "Risegate is an asset tokenization platform that enables businesses to digitize and manage real-world assets on blockchain. The platform supports asset issuance, project management, secure wallet integration, KYC verification, payment processing, and blockchain-based transaction tracking to provide a transparent and secure investment ecosystem.",
    },
    role: { vi: "Lập trình viên Fullstack", en: "Fullstack Developer" },
    year: "2023",
    tags: ["Next.js", "Express.js", "MongoDB", "Kafka", "Wagmi", "Web3.js", "Socket.io", "VNPAY", "VietQR", "ACB"],
    link: "https://risegate.io/",
    featured: true,
    cover: "https://framerusercontent.com/images/oHCMlUL1ZrSH7Hr9kgKZRyab3E.png",
    gallery: [
      "https://framerusercontent.com/images/oHCMlUL1ZrSH7Hr9kgKZRyab3E.png",
      "https://framerusercontent.com/images/CvgRf5V2QhuzNZ98ffgOSwztJs.png",
      "https://framerusercontent.com/images/bfWUzppNPtruUMk8njloQJNTSTU.png",
      "https://framerusercontent.com/images/HHItlWUVW0vw6XmmgykoGRMc.png",
      "https://res.cloudinary.com/thanhphuongdev/image/upload/v1746686812/xdu3ddabap8uohqkp8zw.png",
    ],
    features: {
      vi: [
        "Tái cấu trúc hệ thống backend mô-đun hóa tăng cường tính bảo trì và khả năng chịu tải",
        "Hệ thống API RESTful hiệu năng cao cho quản lý tài sản số, liên kết ví, chiến dịch và giao dịch",
        "Kết nối ví thông minh Web3 phi tập trung sử dụng giao thức Wagmi và Web3.js",
        "Quy trình chuyển tài sản ngang hàng (P2P) bảo mật trực tiếp tới email chưa đăng ký",
        "Luồng giao dịch đáng tin cậy vận hành bởi Kafka kết hợp VietQR, đối soát ACB và cổng VNPAY",
      ],
      en: [
        "Refactored modular backend services architecture enhancing maintainability and scalable throughput",
        "Scalable RESTful APIs for unified digital asset, wallet connections, campaigns, and ledger transactions",
        "Decentralized Web3 smart wallet connectivity using Wagmi and Web3.js protocols",
        "Peer-to-peer (P2P) asset transmission workflows directly targeting unregistered emails securely",
        "Reliable transaction pipelines driven by Kafka with VietQR, ACB Bank ledger, and VNPAY API channels",
      ],
    },
  },
  {
    slug: "on-toeic",
    title: "Ôn TOEIC",
    subtitle: { vi: "Nền tảng luyện thi TOEIC ứng dụng AI", en: "AI-Powered TOEIC Learning Platform" },
    description: {
      vi: "Phát triển nền tảng học tiếng Anh ứng dụng AI phục vụ hơn 2,500 người dùng, cung cấp các tính năng học TOEIC bao gồm Nghe, Nói, Đọc, Ngữ pháp, Từ vựng và Đề thi thử.",
      en: "Developed an AI-powered English learning platform serving 2,500+ users, providing TOEIC learning features including Listening, Speaking, Reading, Grammar, Vocabulary, and mock tests.",
    },
    role: { vi: "Lập trình viên Fullstack (Freelance)", en: "Fullstack Developer (Freelance)" },
    year: "2025",
    tags: [
      "Next.js",
      "TypeScript",
      "NestJS",
      "PostgreSQL",
      "Redis",
      "Prisma",
      "Socket.io",
      "OpenAI API",
      "Cloudinary",
      "Docker",
      "Speech Recognition API",
      "AI Recommendation System",
    ],
    link: "https://www.ontoeic.com/",
    featured: true,
    cover: "https://www.ontoeic.com/og-image.png?v=4",
    // the cover is a 148 KB PNG its host serves only whole: a 1200px WebP copy (~20 KB) for the grids
    thumb: "/site/cover-on-toeic.webp",
    gallery: [
      "https://www.ontoeic.com/og-image.png?v=4",
      "https://res.cloudinary.com/fqqdj43k/image/upload/v1785908415/Screenshot_2026-08-05_123658_cwqrbs.png",
      "https://res.cloudinary.com/fqqdj43k/image/upload/v1785908415/729790721_27608574332126704_5403600951846826839_n_kyebij.jpg",
      "https://res.cloudinary.com/fqqdj43k/image/upload/v1785908415/728225676_27585984394385698_5479477221126610036_n_dnv9kg.jpg",
      "https://res.cloudinary.com/fqqdj43k/image/upload/v1785908417/726914633_27585944151056389_8875298119599664239_n_pdvo1g.jpg",
    ],
    features: {
      vi: [
        "Phát triển nền tảng học tiếng Anh ứng dụng AI phục vụ hơn 2,500 người dùng, cung cấp các tính năng học TOEIC bao gồm Nghe, Nói, Đọc, Ngữ pháp, Từ vựng và Đề thi thử.",
        "Thiết kế và phát triển giao diện người dùng, backend API và kiến trúc cơ sở dữ liệu hỗ trợ quản lý người dùng, theo dõi tiến độ học tập và quy trình quản lý nội dung.",
        "Tích hợp AI và Speech Recognition API để phân tích phát âm, độ trôi chảy và độ chính xác bài nói, cung cấp phản hồi tự động và gợi ý học tập cá nhân hóa.",
        "Phát triển các tính năng học từ vựng, theo dõi tiến trình và hệ thống thách đấu từ vựng đối kháng cho phép người dùng thi đấu trực tiếp với nhau.",
        "Triển khai thuật toán gợi ý lộ trình học tập ứng dụng AI dựa trên kết quả luyện tập, mục tiêu học tập và dữ liệu tiến độ của người dùng.",
      ],
      en: [
        "Developed an AI-powered English learning platform serving 2,500+ users, providing TOEIC learning features including Listening, Speaking, Reading, Grammar, Vocabulary, and mock tests.",
        "Designed and implemented frontend interfaces, backend APIs, and database architecture to support user management, learning progress tracking, and content workflows.",
        "Integrated AI and speech recognition APIs to analyze pronunciation, fluency, and speaking accuracy, providing AI-generated feedback and personalized learning recommendations.",
        "Developed vocabulary learning features, progress tracking, and a competitive vocabulary challenge system that allows users to compete with each other.",
        "Implemented AI-powered learning path recommendations based on user performance, learning goals, and progress data.",
      ],
    },
  },
  {
    slug: "landing-page-metadap",
    title: "Landing Page MetaDAP",
    subtitle: { vi: "Trang giới thiệu doanh nghiệp", en: "Corporate Landing Page" },
    description: {
      vi: "Trang giới thiệu nền tảng Enterprise Blockchain của MetaDAP phục vụ quản lý và giao dịch tài sản số.",
      en: "Landing page introducing MetaDAP’s Enterprise Blockchain platform for digital asset management and trading.",
    },
    role: { vi: "Lập trình viên Fullstack", en: "Fullstack Developer" },
    year: "2024",
    tags: ["Express.js", "Tailwind CSS", "Ant Design", "MongoDB", "Next.js"],
    link: "https://metadap.io/",
    featured: false,
    cover: "https://framerusercontent.com/images/Yyg3RYi3N3nLRtOoLhHzPEa0ryA.png",
    gallery: [
      "https://framerusercontent.com/images/Yyg3RYi3N3nLRtOoLhHzPEa0ryA.png",
      "https://framerusercontent.com/images/l2jEvUGHlnF8yfRVnBgaJR57M.png",
      "https://framerusercontent.com/images/wSJLDSr0lcrUGQaKgLUefGmcGPo.png",
      "https://framerusercontent.com/images/DbdLOakkGjaljym5tuuVVwNd7E4.png",
      "https://cdn.metadap.io/assets/3c23439c-1552-4ed3-914d-665891a6135b/1730983854590-bg_metadap.png",
    ],
    features: {
      vi: [
        "Kiến trúc tối ưu hóa SEO siêu mạnh mẽ tự hào đạt điểm hiệu suất Lighthouse cao",
        "Điểm nhấn thiết kế tương lai đẹp mắt với lưới CSS đáp ứng phức tạp và hào quang môi trường động",
        "Các khối nội dung mô-đun toàn diện trình bày các cơ chế blockchain công nghệ cao một cách trang nhã",
        "Các phần tương tác mượt mà giới thiệu các mạng đăng ký số và cấu trúc bảo mật",
      ],
      en: [
        "Supercharged SEO-optimized architecture boasting high lighthouse performance scores",
        "Sleek futuristic design accents with complex responsive CSS grids and dynamic ambient halos",
        "Comprehensive modular content blocks presenting high-tech blockchain mechanisms elegantly",
        "Slick interactive sections introducing digital registry networks and security structures",
      ],
    },
  },
  {
    slug: "verify-document",
    title: "Verify Document",
    subtitle: { vi: "Nền tảng xác thực tài liệu số Blockchain", en: "Blockchain Document Verification Platform" },
    description: {
      vi: "Verify Document là ứng dụng xác thực tài liệu số của Sở khoa học & Công nghệ TP Đà Nẵng, sử dụng công nghệ blockchain để đảm bảo tính xác thực và tính toàn vẹn của các bản ghi kỹ thuật số. Nền tảng cho phép quản trị viên tải lên và quản lý tài liệu gốc, đồng thời cho phép người dùng đối chiếu và xác minh tài liệu vật lý với hồ sơ tin cậy được lưu trữ trên blockchain. Kết quả: Được Sở Khoa học & Công nghệ TP Đà Nẵng đưa vào sử dụng thành công.",
      en: "Verify Document is a blockchain-based document verification platform designed to ensure the authenticity and integrity of digital records. The platform enables administrators to upload and manage original documents while allowing users to verify whether physical documents match trusted records stored on the blockchain. Result: Successfully deployed and utilized by the Department of Science and Technology of Da Nang City.",
    },
    role: { vi: "Lập trình viên Fullstack", en: "Fullstack Developer" },
    year: "2025",
    tags: ["Next.js", "NestJS", "MongoDB", "Blockchain", "TypeScript", "Tailwind CSS"],
    link: "https://verify-document.risegate.io/",
    linkExpired: true,
    featured: false,
    cover: "https://framerusercontent.com/images/oQYoVQDeWpZRiRLNZegGTlOSXk.png",
    gallery: [
      "https://framerusercontent.com/images/oQYoVQDeWpZRiRLNZegGTlOSXk.png",
      "https://res.cloudinary.com/fqqdj43k/image/upload/v1783934733/Screenshot_2026-07-13_162205_mcz1zx.png",
      "https://res.cloudinary.com/fqqdj43k/image/upload/v1783934733/Screenshot_2026-07-13_162241_hklnzj.png",
    ],
    features: {
      vi: [
        "Đã triển khai thành công và đưa vào sử dụng chính thức tại Sở Khoa học & Công nghệ TP Đà Nẵng để xác thực các văn bản số một cách an toàn.",
        "Thiết kế và tối ưu hóa cấu trúc cơ sở dữ liệu cho quy trình quản lý và xác thực tài liệu (MongoDB).",
        "Phát triển hệ thống các cổng API RESTful hiệu năng cao bằng NestJS phục vụ tải lên, quản lý, xác minh tài liệu.",
        "Triển khai cơ chế xác thực JWT và Phân quyền truy cập dựa trên vai trò (RBAC) nghiêm ngặt.",
        "Tích hợp blockchain doanh nghiệp MetaDAP để lưu trữ và đối soát hồ sơ xác thực tài liệu gốc bảo mật.",
        "Xây dựng luồng công việc xác thực tài liệu thông minh nhằm đối chiếu tài liệu vật lý với hồ sơ blockchain.",
        "Xây dựng giao diện người dùng tương thích cao và bảng quản trị chuyên nghiệp bằng React, Next.js và Tailwind CSS / shadcn.",
        "Triển khai giải pháp xác thực qua mã QR Code tiện lợi giúp kiểm tra tài liệu nhanh chóng bằng thiết bị di động.",
        "Tối ưu hóa SEO, hiệu suất tải trang, truy vấn cơ sở dữ liệu và API giúp nâng cao khả năng hiển thị tìm kiếm và tính ổn định.",
      ],
      en: [
        "Successfully deployed and officially utilized by the Department of Science and Technology of Da Nang City (Sở Khoa học & Công nghệ TP Đà Nẵng) for secure document validation.",
        "Designed and optimized the database schema for document management and verification workflows (MongoDB).",
        "Developed RESTful APIs using NestJS for document upload, management, verification, and user operations.",
        "Implemented secure JWT Authentication and robust Role-Based Access Control (RBAC).",
        "Integrated MetaDAP Enterprise Blockchain services to store and verify document authenticity records securely.",
        "Developed seamless document verification workflows to validate physical documents against immutable blockchain records.",
        "Built modern, responsive admin dashboards and user interfaces using React, Next.js, and Tailwind CSS / shadcn.",
        "Implemented QR Code-based verification flows for lightning-fast document validation.",
        "Optimized SEO, search performance, database queries, and APIs to guarantee high visibility and system reliability.",
      ],
    },
  },
  {
    slug: "vide",
    title: "VIDE",
    subtitle: { vi: "Nền tảng phát triển kinh tế số", en: "Digital Economy Platform" },
    description: {
      vi: "VIDE là Viện Phát triển Kinh tế Số Việt Nam, tập trung vào việc áp dụng công nghệ và các giải pháp do AI thúc đẩy nhằm hỗ trợ sự tăng trưởng, khả năng cạnh tranh và chuyển đổi số của doanh nghiệp. Dự án được thiết kế nhằm giới thiệu tổ chức theo cách hiện đại, uy tín và có cấu trúc hơn thông qua các dịch vụ, chương trình và sự hiện diện kỹ thuật số hướng tới công chúng.",
      en: "VIDE is the Vietnam Institute of Digital Economy Development, focused on applying technology and AI-driven solutions to support business growth, competitiveness, and digital transformation. The project was designed to present the organization in a more modern, credible, and structured way across its services, programs, and public-facing digital presence.",
    },
    role: { vi: "Lập trình viên Fullstack", en: "Fullstack Developer" },
    year: "2022",
    tags: ["Express.js", "Tailwind CSS", "Ant Design", "MongoDB", "Next.js"],
    link: "https://vide.vn/",
    featured: false,
    cover: "https://framerusercontent.com/images/TzkRokvts9yf9XUkdO8z4zXCFys.png",
    gallery: [
      "https://framerusercontent.com/images/TzkRokvts9yf9XUkdO8z4zXCFys.png",
      "https://framerusercontent.com/images/6pVLZRvLg1L2BLSvfVmk5cL0cI.png",
      "https://framerusercontent.com/images/GU5tctqzyzZzcQbKiUrWMxFXn4.png",
      "https://res.cloudinary.com/thanhphuongdev/image/upload/v1760691387/Hero_44_m4h7su.png",
      "https://res.cloudinary.com/fqqdj43k/image/upload/v1783747244/Screenshot_2026-07-11_121850_fpajgy.png",
    ],
    features: {
      vi: [
        "Thiết kế giao diện hiện đại, uy tín và có cấu trúc rõ ràng phản ánh vai trò của VIDE trong phát triển kinh tế số",
        "Xây dựng bản sắc hình ảnh sắc nét với hệ thống điều hướng hiệu năng cao và hiệu ứng cuộn mượt mà",
        "Triển khai các khối nội dung toàn diện cho sứ mệnh, tầm nhìn, dịch vụ và các chương trình đào tạo chiến lược",
        "Tối ưu hóa thiết kế tương thích (responsive) giúp hiển thị mượt mà trên mọi thiết bị di động, máy tính bảng và máy tính để bàn",
      ],
      en: [
        "Designed a modern, credible, and structured interface reflecting VIDE's leadership in digital economy development",
        "Established a clear visual identity with high-performance navigation and smooth scroll behavior",
        "Implemented comprehensive sections for VIDE's mission, vision, services, and strategic training programs",
        "Optimized responsive styling for seamless access across mobile, tablet, and desktop devices",
      ],
    },
  },
  {
    slug: "metaos",
    title: "MetaOS",
    subtitle: { vi: "Trải nghiệm sản phẩm số", en: "Digital Product Experience" },
    description: {
      vi: "MetaOS là một trải nghiệm sản phẩm số được xây dựng cho hệ sinh thái MetaDAP, được thiết kế để trình bày cơ sở hạ tầng tài sản được mã hóa một cách rõ ràng và dễ tiếp cận hơn. Dự án tập trung vào việc chuyển đổi một nền tảng dựa trên blockchain phức tạp thành một giao diện có cấu trúc hơn với hệ thống phân cấp, khả năng sử dụng và độ rõ nét của sản phẩm tốt hơn.",
      en: "MetaOS is a digital product experience built for the MetaDAP ecosystem, designed to present tokenized asset infrastructure in a clearer and more accessible way. The project focused on turning a complex blockchain-based platform into a more structured interface with stronger hierarchy, usability, and product clarity.",
    },
    role: { vi: "Lập trình viên Frontend", en: "Frontend Developer" },
    year: "2024",
    tags: ["Next.js", "TypeScript", "React.js", "Tailwind CSS", "Framer Motion"],
    link: "https://metaos.metadap.io/",
    featured: false,
    cover: "https://framerusercontent.com/images/d3qQCuIz37NLapX1u7f0K2v003g.png",
    gallery: [
      "https://framerusercontent.com/images/d3qQCuIz37NLapX1u7f0K2v003g.png",
      "https://res.cloudinary.com/fqqdj43k/image/upload/v1783749707/image_3_itwxrz.png",
      "https://res.cloudinary.com/fqqdj43k/image/upload/v1783749708/Screenshot_2026-07-11_130024_tqz4iy.png",
      "https://res.cloudinary.com/fqqdj43k/image/upload/v1783749707/Screenshot_2026-07-11_125942_o2ly79.png",
      "https://res.cloudinary.com/fqqdj43k/image/upload/v1783749707/Screenshot_2026-07-11_130001_slahwr.png",
    ],
    // TODO: these features are identical to "Check-in Event" on the old site (likely copy-paste). Confirm.
    features: {
      vi: [
        "Phát triển trang giới thiệu (landing page) phản hồi tối ưu bằng Next.js và TypeScript.",
        "Xây dựng các thành phần giao diện người dùng có khả năng tái sử dụng cao giúp tối ưu hóa khả năng bảo trì và phát triển.",
        "Triển khai các hiệu ứng chuyển động và tương tác mượt màng bằng Framer Motion nhằm nâng cao trải nghiệm người dùng.",
        "Tối ưu hóa hiệu suất trang web và cấu hình SEO giúp cải thiện thứ hạng và khả năng tìm kiếm.",
        "Chuyển đổi các yêu cầu sản phẩm và ý tưởng thiết kế thành giao diện trực quan và thân thiện với người dùng.",
      ],
      en: [
        "Developed responsive landing pages using Next.js and TypeScript.",
        "Built reusable UI components to improve maintainability and development efficiency.",
        "Implemented interactive animations and transitions using Framer Motion to enhance user experience.",
        "Optimized page performance and SEO for better accessibility and search visibility.",
        "Translated product requirements and design concepts into a clear and user-friendly interface.",
      ],
    },
  },
  {
    slug: "check-in-event",
    title: "Check-in Event",
    subtitle: { vi: "Hệ thống quản lý sự kiện qua mã QR", en: "QR-based Event Management" },
    description: {
      vi: "Check-in Event là ứng dụng quản lý sự kiện dựa trên mã QR được xây dựng nhằm giúp ban tổ chức đăng tải sự kiện, quản lý người tham dự, và tinh giản quy trình check-in tại chỗ cho người tham gia, kiểm soát ra vào và phát quà. Luồng check-in bằng mã QR được sử dụng rộng rãi để tăng tốc độ gia nhập, xác thực sự tham gia và cung cấp báo cáo theo dõi người tham gia theo thời gian thực cho nhà tổ chức. Kết quả: Được tin dùng để check-in sự kiện DaVAS.",
      en: "Check-in Event is a QR-based event management application built to help organizers publish events, manage attendance, and streamline on-site check-in for participants, access control, and gift distribution. QR check-in flows are widely used to speed up entry, validate participation, and provide real-time attendance tracking for organizers.",
    },
    role: { vi: "Lập trình viên Full Stack", en: "Full Stack Developer" },
    year: "2025",
    tags: ["Next.js", "TypeScript", "React.js", "Tailwind CSS", "Framer Motion"],
    link: "https://checkin.metadap.io/",
    featured: false,
    cover: "https://framerusercontent.com/images/idX3SWLbFoGIAfCApb1vREVSPk.png",
    gallery: [
      "https://framerusercontent.com/images/idX3SWLbFoGIAfCApb1vREVSPk.png",
      "https://res.cloudinary.com/fqqdj43k/image/upload/v1783936004/Screenshot_2026-07-13_162241_pcz2fo.png",
      "https://res.cloudinary.com/fqqdj43k/image/upload/v1783936008/685a9ad3-5483-41f7-910e-17d305dce41b_gip0z5.png",
      "https://res.cloudinary.com/fqqdj43k/image/upload/v1783936003/Screenshot_2026-07-13_164426_wutctu.png",
      "https://res.cloudinary.com/fqqdj43k/image/upload/v1783936003/Screenshot_2026-07-13_164438_m0zz3s.png",
    ],
    features: {
      vi: [
        "Đã áp dụng thành công cho hoạt động check-in tại sự kiện DaVAS, giúp việc điểm danh và kiểm soát lối vào diễn ra trơn tru.",
        "Phát triển trang giới thiệu (landing page) phản hồi tối ưu bằng Next.js và TypeScript.",
        "Xây dựng các thành phần giao diện người dùng có khả năng tái sử dụng cao giúp tối ưu hóa khả năng bảo trì và phát triển.",
        "Triển khai các hiệu ứng chuyển động và tương tác mượt màng bằng Framer Motion nhằm nâng cao trải nghiệm người dùng.",
        "Tối ưu hóa hiệu suất trang web và cấu hình SEO giúp cải thiện thứ hạng và khả năng tìm kiếm.",
        "Chuyển đổi các yêu cầu sản phẩm và ý tưởng thiết kế thành giao diện trực quan và thân thiện với người dùng.",
      ],
      en: [
        "Successfully powered the DaVAS event check-in experience, managing smooth access and attendee lists.",
        "Developed responsive landing pages using Next.js and TypeScript.",
        "Built reusable UI components to improve maintainability and development efficiency.",
        "Implemented interactive animations and transitions using Framer Motion to enhance user experience.",
        "Optimized page performance and SEO for better accessibility and search visibility.",
        "Translated product requirements and design concepts into a clear and user-friendly interface.",
      ],
    },
  },
  {
    slug: "bigbee",
    title: "BigBee",
    subtitle: { vi: "Thương hiệu Truyền thông Sáng tạo & Đào tạo", en: "Creative Media & Education Brand" },
    description: {
      vi: "BigBee là thương hiệu sáng tạo kết hợp giữa sản xuất truyền thông, dịch vụ phòng thu (studio) và giáo dục tiếng Anh trong một diện mạo kỹ thuật số hiện đại. Dự án được thiết kế nhằm giới thiệu thương hiệu một cách chuyên nghiệp, thu hút và gần gũi, đồng thời truyền tải rõ nét các giá trị sáng tạo và giáo dục.",
      en: "BigBee is a creative brand that combines media production, studio services, and English education into one modern digital presence. The project was designed to present the brand in a more professional, engaging, and approachable way while clearly communicating its creative and educational value.",
    },
    role: { vi: "Lập trình viên Frontend", en: "Frontend Developer" },
    year: "2024",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "React.js"],
    // No public link on the old site.
    featured: false,
    cover: "https://framerusercontent.com/images/ei8RMX7xPpQUkdcfE8Rk9hHvQ.png?width=1776&height=1288",
    gallery: [
      "https://framerusercontent.com/images/ei8RMX7xPpQUkdcfE8Rk9hHvQ.png?width=1776&height=1288",
      "https://framerusercontent.com/images/gVEnC3kISinkkzFp2FHGJVj0.png?width=1776&height=1288",
      "https://framerusercontent.com/images/8YZx271UT28vPLr5N8MwJ7krlM.png",
    ],
    features: {
      vi: [
        "Nhận diện thương hiệu số hiện đại giới thiệu năng lực sản xuất truyền thông đa phương tiện và dịch vụ phòng thu",
        "Cổng thông tin đào tạo tiếng Anh tương tác nổi bật các khóa học và phương pháp giảng dạy lôi cuốn",
        "Hiệu ứng chuyển động mượt mà và bố cục đáp ứng cao cấp vận hành bởi Framer Motion và Tailwind CSS",
        "Tối ưu hóa tải tài nguyên đa phương tiện chất lượng cao phục vụ hình ảnh và video sắc nét",
        "Kiến trúc responsive ưu tiên di động mang lại trải nghiệm mượt mà trên mọi thiết bị",
      ],
      en: [
        "Modern digital brand identity showcasing multimedia production and creative studio services",
        "Interactive English education portal highlighting learning programs and engaging teaching workflows",
        "Smooth scroll animations and interactive responsive layouts powered by Framer Motion and Tailwind CSS",
        "Optimized media asset delivery for high-resolution visual storytelling and video showcases",
        "Mobile-first responsive architecture delivering seamless user experience across all devices",
      ],
    },
  },
  {
    slug: "admin-system-collection",
    title: "Admin System Collection",
    subtitle: { vi: "Hệ thống Bảng Quản trị & Điều hành Doanh nghiệp", en: "Enterprise Operations & Admin Dashboards Hub" },
    description: {
      vi: "Admin System Collection là dự án tập trung quy tụ nhiều hệ thống giao diện quản trị (Admin Dashboard) được phát triển qua nhiều sản phẩm và mô hình nghiệp vụ khác nhau. Mục tiêu của dự án là kiến tạo một trải nghiệm hệ thống nội bộ nhất quán, hiệu năng cao và có khả năng mở rộng bằng cách chuẩn hóa các luồng nghiệp vụ phức tạp, công cụ quản lý dữ liệu và bảng điều khiển vận hành vào một cấu trúc thiết kế rõ ràng và trực quan.",
      en: "Admin System Collection is a centralized project that brings together multiple admin interfaces developed across different products and business cases. The goal of this project was to create a more consistent, efficient, and scalable internal system experience by organizing complex workflows, data management tools, and operational dashboards into a clear and usable design structure.",
    },
    role: { vi: "Lập trình viên Fullstack / Kiến trúc hệ thống", en: "Fullstack Developer / System Architect" },
    year: "2024 – 2025",
    tags: ["React.js", "Next.js", "NestJS", "PostgreSQL", "Ant Design", "Tailwind CSS", "Redis", "Kafka"],
    // No public link on the old site (internal systems).
    featured: false,
    cover: "https://framerusercontent.com/images/DLJUgRIaXBJC4RYi0svCJKjSI.png",
    gallery: ["https://framerusercontent.com/images/DLJUgRIaXBJC4RYi0svCJKjSI.png"],
    features: {
      vi: [
        "Hệ thống quản lý định danh tập trung (Identity Management) với cơ chế JWT, 2FA và phân quyền (RBAC) đa cấp chặt chẽ",
        "Trung tâm điều hành nạp tiền (Top-up & Billing Operations) với đối soát số dư ví, duyệt giao dịch và kiểm toán dòng tiền",
        "Hệ thống quản lý thông báo đa kênh (Notification Hub) hỗ trợ đẩy tin real-time qua WebSockets, Email và SMS",
        "Bảng điều khiển trực quan hóa dữ liệu (Operational Dashboards) với biểu đồ tăng trưởng, trạng thái hệ thống và log sự kiện",
        "Công cụ quản lý người dùng, khóa tài khoản, phân chia vai trò và kiểm soát quyền truy cập chi tiết đến từng API",
        "Kiến trúc mô-đun hóa micro-frontend / reusable components giúp triển khai nhanh cho nhiều dự án doanh nghiệp",
      ],
      en: [
        "Centralized Identity Management Hub with strict JWT, 2FA, and granular multi-tier Role-Based Access Control (RBAC)",
        "Top-up & Billing Operations Dashboard supporting wallet balance reconciliations, transaction approvals, and audit trails",
        "Omnichannel Notification Center managing push notifications, real-time WebSocket alerts, email campaigns, and SMS dispatch",
        "Real-time Operational Analytics with high-density data tables, metric summaries, and automated system logs inspection",
        "Comprehensive User Management allowing instant role provisioning, session revocation, and security audit enforcement",
        "Modular, component-driven design system enabling rapid deployment across diverse enterprise web products",
      ],
    },
  },
];

export const experiences: Experience[] = [
  {
    company: "Ôn TOEIC (Freelance Project)",
    role: { vi: "Lập trình viên Full-Stack (Freelance)", en: "Full-Stack Developer (Freelance)" },
    period: { start: "10/2025", end: "present" },
    location: { vi: "Đà Nẵng, Việt Nam / Remote", en: "Da Nang, Vietnam / Remote" },
    achievements: {
      vi: [
        "Xây dựng và phát triển nền tảng học TOEIC ứng dụng AI phục vụ hơn 2,500 người dùng.",
        "Tích hợp AI phân tích giọng nói, đánh giá phát âm và độ trôi chảy theo thời gian thực.",
        "Phát triển tính năng đấu từ vựng đối kháng thời gian thực qua Socket.io.",
        "Xây dựng hệ thống gợi ý lộ trình học tập cá nhân hóa dựa trên dữ liệu quá trình học.",
      ],
      en: [
        "Built and scaled an AI-powered TOEIC learning platform growing to 2,500+ active users.",
        "Developed speech recognition & AI feedback for pronunciation and fluency analysis.",
        "Implemented real-time competitive vocabulary challenges using WebSockets (Socket.io).",
        "Engineered adaptive AI-based learning path recommendations based on user performance data.",
      ],
    },
    highlights: {
      vi: [
        "Nền tảng TOEIC AI, 2,500+ người dùng",
        "AI chấm phát âm thời gian thực",
        "Đấu từ vựng real-time qua Socket.io",
        "Lộ trình học cá nhân hoá",
      ],
      en: [
        "AI TOEIC platform, 2,500+ users",
        "Real-time AI pronunciation scoring",
        "Real-time vocabulary duels on Socket.io",
        "Personalised learning paths",
      ],
    },
    summary: {
      vi: "Nền tảng học TOEIC có AI, hơn 2,500 người dùng.",
      en: "An AI TOEIC learning platform with 2,500+ users.",
    },
    tech: [
      "Next.js",
      "TypeScript",
      "NestJS",
      "PostgreSQL",
      "Redis",
      "Prisma",
      "Socket.io",
      "OpenAI API",
      "Cloudinary",
      "Docker",
      "Speech Recognition API",
      "AI Recommendation System",
    ],
  },
  {
    company: "METADAP",
    role: { vi: "Lập trình viên Fullstack", en: "Fullstack Developer" },
    period: { start: "03/2024", end: "present" },
    location: { vi: "Đà Nẵng, Việt Nam", en: "Da Nang, Vietnam" },
    achievements: {
      vi: [
        "Phát triển ứng dụng web doanh nghiệp bao gồm token hóa tài sản và nền tảng thương mại điện tử.",
        "Xây dựng và duy trì RESTful API cho giao tiếp giữa frontend và backend.",
        "Tích hợp cổng thanh toán (VNPAY, ACB) và các dịch vụ của bên thứ ba.",
        "Làm việc với Next.js, Express.js và MongoDB trong môi trường sản phẩm thực tế.",
      ],
      en: [
        "Developed enterprise web applications including asset tokenization and e-commerce platforms.",
        "Built and maintained RESTful APIs for frontend-backend communication.",
        "Integrated payment gateways (VNPAY, ACB) and third-party services.",
        "Worked with Next.js, Express.js, and MongoDB in production environments.",
      ],
    },
    highlights: {
      vi: [
        "Token hoá tài sản & thương mại điện tử",
        "Thiết kế RESTful API",
        "Cổng thanh toán VNPAY, ACB",
        "Next.js, Express.js, MongoDB thực chiến",
      ],
      en: [
        "Asset tokenization & e-commerce",
        "RESTful API design",
        "VNPAY & ACB payment gateways",
        "Next.js, Express.js, MongoDB in production",
      ],
    },
    summary: {
      vi: "Fullstack cho token hoá tài sản và thương mại điện tử.",
      en: "Fullstack on asset tokenization and e-commerce.",
    },
    tech: ["Next.js", "Express.js", "MongoDB", "VNPay", "ACB", "Blockchain"],
  },
];

/** Provided by the owner (not on the old site). */
export const education: Education = {
  school: { vi: "Đại học Duy Tân", en: "Duy Tan University" },
  major: "Big Data & Machine Learning",
  graduationYear: "2024",
};

/** "Hành trình". Periods kept exactly as on the old site (owner's decision). */
export const journey: JourneyStep[] = [
  {
    key: "ACADEMIC",
    title: { vi: "Nền móng", en: "The Foundation" },
    subtitle: "Duy Tan University",
    description: {
      vi: "Bắt đầu hành trình công nghệ tại Đại học Duy Tân, chuyên ngành Big Data & Machine Learning, xây dựng nền tảng vững chắc về thuật toán, cấu trúc dữ liệu và tư duy logic.",
      en: "Began my tech journey in Big Data & Machine Learning, building a rock-solid foundation in algorithms, data structures, and logical thinking.",
    },
    period: { start: "2020", end: "2022" },
    summary: {
      vi: "Nền tảng thuật toán và dữ liệu tại Đại học Duy Tân.",
      en: "Algorithms and data foundations at Duy Tan University.",
    },
  },
  {
    key: "PASSION",
    title: { vi: "Bước ngoặt", en: "The Pivot" },
    subtitle: "Web Evolution",
    description: {
      vi: "Phát hiện niềm đam mê sâu sắc với Lập trình Web vào năm thứ 2. Quyết định chuyển hướng hoàn toàn sang làm chủ hệ sinh thái Frontend & Backend hiện đại để xây dựng các sản phẩm thực tế.",
      en: "Discovered a deep passion for Web Development in my 2nd year. Decided to pivot entirely to mastering modern Frontend & Backend ecosystems to build tangible products.",
    },
    period: { start: "2022", end: "2024" },
    summary: {
      vi: "Chuyển hẳn sang lập trình web Frontend và Backend.",
      en: "A full switch to Frontend and Backend web development.",
    },
  },
  {
    key: "SOLUTIONS",
    title: { vi: "Sự chuyên nghiệp", en: "The Professional" },
    subtitle: "METADAP Solutions",
    description: {
      vi: "Hiện là Lập trình viên Fullstack tại METADAP. Trực tiếp thiết kế giải pháp, cơ sở dữ liệu và phát triển mã nguồn cốt lõi cho các hệ thống thương mại điện tử quy mô lớn với độ ổn định cao.",
      en: "Currently a Fullstack Developer at METADAP. Directly designing solutions, databases, and developing core source code for large-scale e-commerce systems with high concurrency.",
    },
    // Old site showed only "PRESENT" here; the old site had no start year.
    period: { end: "present" },
  },
];

/**
 * Kept as the old footer: "© {year} HO VAN THANH PHUONG // V2.5 // CORE_ACTIVE"
 * (owner's decision; a copy-lint hit on it is waived with that reason).
 */
export const footer = {
  copyrightName: "HO VAN THANH PHUONG",
  suffix: "// V2.5 // CORE_ACTIVE",
} as const;

export const presentLabel: Localized = { vi: "Hiện tại", en: "Present" };
