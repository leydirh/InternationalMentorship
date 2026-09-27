import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const env = (process as any).env;
    if (env && env.DB) {
      const { results } = await env.DB.prepare("SELECT * FROM forum_posts ORDER BY created_at DESC").all();
      return NextResponse.json({ success: true, posts: results });
    }
    return NextResponse.json({ success: true, posts: [] });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, content, tag, authorName, authorRole, authorEmail } = body;

    if (!title || !content || !authorName) {
      return NextResponse.json({ success: false, error: "Title, content, and author name are required" }, { status: 400 });
    }

    const postId = `post-${Date.now()}`;
    const tagVal = tag || "General";
    const roleVal = authorRole || "Student";
    const createdAtStr = new Date().toISOString();

    const env = (process as any).env;
    if (env && env.DB) {
      await env.DB.prepare(
        `INSERT INTO forum_posts (id, title, content, tag, author_name, author_role, author_email, likes, comments_count, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, 0, 0, ?)`
      ).bind(
        postId,
        title,
        content,
        tagVal,
        authorName,
        roleVal,
        authorEmail || "",
        createdAtStr
      ).run();
    }

    return NextResponse.json({
      success: true,
      post: {
        id: postId,
        title,
        content,
        tag: tagVal,
        authorName,
        authorRole: roleVal,
        authorEmail,
        likes: 0,
        commentsCount: 0,
        createdAt: "Just now",
        replies: [],
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { postId, action } = body;

    if (!postId) {
      return NextResponse.json({ success: false, error: "postId is required" }, { status: 400 });
    }

    const env = (process as any).env;
    if (env && env.DB) {
      if (action === "like") {
        await env.DB.prepare("UPDATE forum_posts SET likes = likes + 1 WHERE id = ?").bind(postId).run();
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
