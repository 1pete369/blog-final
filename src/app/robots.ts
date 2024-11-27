import { MetadataRoute } from "next";

export default function robots() : MetadataRoute.Robots{
    return {
        rules : [{
            userAgent : "*",
            allow : "/",
            disallow :["/admin" , "/admin/create-blog"]
        }],
        sitemap : `${process.env.NEXT_PUBLIC_BASE_APP_URL}/sitemap.xml`
    }
}