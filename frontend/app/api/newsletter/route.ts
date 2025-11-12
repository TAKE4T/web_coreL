import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    console.log('=== メルマガ登録API開始 ===');
    const { email } = await request.json();
    console.log('受信したメールアドレス:', email);

    // バリデーション
    if (!email) {
      console.log('エラー: メールアドレスが空');
      return NextResponse.json({ error: 'メールアドレスを入力してください' }, { status: 400 });
    }

    // メールアドレスの形式チェック
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('エラー: メールアドレスの形式が不正');
      return NextResponse.json({ error: 'メールアドレスの形式が正しくありません' }, { status: 400 });
    }

    console.log('データベース接続確認...');
    console.log('DATABASE_URL:', process.env.DATABASE_URL ? '設定済み' : '未設定');

    // データベースに保存（既存の場合は更新）
    console.log('データベースに保存中...');
    const newsletter = await prisma.newsletter.upsert({
      where: { email },
      update: { updatedAt: new Date() },
      create: { email },
    });

    console.log('保存成功:', newsletter.id);
    return NextResponse.json({
      message: 'メルマガ登録が完了しました',
      id: newsletter.id
    }, { status: 200 });
  } catch (error) {
    console.error('=== メルマガ登録エラー詳細 ===');
    console.error('エラーメッセージ:', error);
    console.error('エラースタック:', error instanceof Error ? error.stack : 'スタックなし');
    return NextResponse.json({ error: '登録に失敗しました' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
    console.log('=== メルマガ登録API終了 ===');
  }
}
