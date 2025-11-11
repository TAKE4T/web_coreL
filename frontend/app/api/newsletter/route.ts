import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // バリデーション
    if (!email) {
      return NextResponse.json({ error: 'メールアドレスを入力してください' }, { status: 400 });
    }

    // メールアドレスの形式チェック
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'メールアドレスの形式が正しくありません' }, { status: 400 });
    }

    // データベースに保存（既存の場合は更新）
    const newsletter = await prisma.newsletter.upsert({
      where: { email },
      update: { updatedAt: new Date() },
      create: { email },
    });

    return NextResponse.json({
      message: 'メルマガ登録が完了しました',
      id: newsletter.id
    }, { status: 200 });
  } catch (error) {
    console.error('メルマガ登録エラー:', error);
    return NextResponse.json({ error: '登録に失敗しました' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
