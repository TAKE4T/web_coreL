const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testDatabase() {
  try {
    console.log('データベース接続テスト開始...');
    console.log('DATABASE_URL:', process.env.DATABASE_URL ? '設定済み' : '未設定');

    // データベース接続テスト
    await prisma.$connect();
    console.log('✓ データベース接続成功');

    // Newsletterテーブルの確認
    const count = await prisma.newsletter.count();
    console.log('✓ Newsletterテーブル存在確認: 件数 =', count);

    // テストデータの挿入
    console.log('テストメールアドレスを登録中...');
    const testEmail = 'test@example.com';
    const newsletter = await prisma.newsletter.upsert({
      where: { email: testEmail },
      update: { updatedAt: new Date() },
      create: { email: testEmail },
    });
    console.log('✓ テスト登録成功:', newsletter);

    // 登録データの確認
    const allNewsletters = await prisma.newsletter.findMany();
    console.log('✓ 登録済みメールアドレス一覧:');
    allNewsletters.forEach((n, index) => {
      console.log(`  ${index + 1}. ${n.email} (登録日: ${n.createdAt})`);
    });

    console.log('\nすべてのテスト成功！');
  } catch (error) {
    console.error('エラー発生:', error);
    console.error('エラー詳細:', error.message);
    if (error.stack) {
      console.error('スタックトレース:', error.stack);
    }
  } finally {
    await prisma.$disconnect();
  }
}

testDatabase();
