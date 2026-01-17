'use client';

import logger from '@/lib/logger';
import { useState, FormEvent } from 'react';

export default function NewsletterPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      logger.debug('メルマガ登録リクエスト送信:', email);
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      logger.debug('レスポンスステータス:', response.status);
      const data = await response.json();
      logger.debug('レスポンスデータ:', data);

      if (response.ok) {
        setSubmitMessage('メルマガ登録ありがとうございます！');
        setEmail('');
      } else {
        const errorMessage = data.error || '登録に失敗しました。再度お試しください。';
        setSubmitMessage(errorMessage);
        logger.error('エラー詳細:', data);
      }
    } catch (error) {
      logger.error('キャッチしたエラー:', error);
      setSubmitMessage('エラーが発生しました。再度お試しください。: ' + (error instanceof Error ? error.message : String(error)));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-md px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">メルマガ登録</h1>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              メールアドレス
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50"
          >
            {isSubmitting ? '登録中...' : '登録'}
          </button>

          {submitMessage && (
            <p className="mt-4 text-sm text-center text-gray-600">{submitMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
}
