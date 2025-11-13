import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    console.log('=== お問い合わせAPI開始 ===');
    const { name, email, message } = await request.json();
    console.log('受信したデータ:', { name, email, messageLength: message?.length });

    // バリデーション
    if (!name || !email || !message) {
      console.log('エラー: 必須フィールドが空');
      return NextResponse.json({ error: '全てのフィールドを入力してください' }, { status: 400 });
    }

    // メールアドレスの形式チェック
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('エラー: メールアドレスの形式が不正');
      return NextResponse.json({ error: 'メールアドレスの形式が正しくありません' }, { status: 400 });
    }

    console.log('データベース接続確認...');
    console.log('DATABASE_URL:', process.env.DATABASE_URL ? '設定済み' : '未設定');

    // データベースに保存
    console.log('データベースに保存中...');
    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        message,
      },
    });

    console.log('保存成功:', contact.id);
    return NextResponse.json({
      message: 'お問い合わせを受け付けました。ありがとうございます。',
      id: contact.id
    }, { status: 200 });
  } catch (error) {
    console.error('=== お問い合わせエラー詳細 ===');
    console.error('エラーメッセージ:', error);
    console.error('エラースタック:', error instanceof Error ? error.stack : 'スタックなし');
    return NextResponse.json({ error: 'お問い合わせの送信に失敗しました' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
    console.log('=== お問い合わせAPI終了 ===');
  }
}
