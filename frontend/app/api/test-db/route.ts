import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    console.log('=== データベーステスト開始 ===');
    console.log('DATABASE_URL:', process.env.DATABASE_URL ? '設定済み' : '未設定');

    // データベース接続テスト
    await prisma.$connect();
    console.log('✓ データベース接続成功');

    // Newsletterテーブルの件数確認
    const count = await prisma.newsletter.count();
    console.log('✓ Newsletter件数:', count);

    // 全データ取得
    const newsletters = await prisma.newsletter.findMany();
    console.log('✓ Newsletter一覧:', newsletters);

    return NextResponse.json({
      success: true,
      count,
      newsletters
    });
  } catch (error) {
    console.error('=== データベーステストエラー ===');
    console.error('エラー:', error);

    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
