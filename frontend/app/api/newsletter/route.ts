import { NextRequest, NextResponse } from 'next/server';
import logger from '@/lib/logger';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    logger.info('=== メルマガ登録API開始 ===');
    const { email } = await request.json();
    logger.debug('受信したメールアドレス:', email);

    // バリデーション
    if (!email) {
      logger.warn('エラー: メールアドレスが空');
      return NextResponse.json({ error: 'メールアドレスを入力してください' }, { status: 400 });
    }

    // メールアドレスの形式チェック
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      logger.warn('エラー: メールアドレスの形式が不正');
      return NextResponse.json({ error: 'メールアドレスの形式が正しくありません' }, { status: 400 });
    }

    logger.debug('データベース接続確認...');
    logger.debug('DATABASE_URL:', process.env.DATABASE_URL ? '設定済み' : '未設定');

    // データベースに保存（既存の場合は更新）
    logger.debug('データベースに保存中...');
    const newsletter = await prisma.newsletter.upsert({
      where: { email },
      update: { updatedAt: new Date() },
      create: { email },
    });

    logger.info('保存成功:', newsletter.id);
    return NextResponse.json({
      message: 'メルマガ登録が完了しました',
      id: newsletter.id
    }, { status: 200 });
  } catch (error) {
    logger.error('=== メルマガ登録エラー詳細 ===');
    logger.error('エラーメッセージ:', error);
    logger.error('エラースタック:', error instanceof Error ? error.stack : 'スタックなし');
    return NextResponse.json({ error: '登録に失敗しました' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
    logger.info('=== メルマガ登録API終了 ===');
  }
}
