import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: { unoptimized: true },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
