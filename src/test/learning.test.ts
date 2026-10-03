import test from 'node:test';
import assert from 'node:assert/strict';
import { learningCaptionTimes, learningPauseSeconds, learningRepeat, parseLearningCaptionTimes } from '../public/learning.js';

test('各日本語文を反復し、ポーズ込みの字幕時刻を作る', () => {
  assert.deepEqual(learningCaptionTimes([2, 3], { repeat: 2, pauseSeconds: 1.5 }), [0, 7, 16]);
});

test('学習用の反復回数とポーズを安全な範囲へ収める', () => {
  assert.equal(learningRepeat(10), 3);
  assert.equal(learningRepeat('bad'), 2);
  assert.equal(learningPauseSeconds(-1), 0);
  assert.equal(learningPauseSeconds(10), 5);
});

test('サーバーが返す学習字幕時刻を検証する', () => {
  assert.deepEqual(parseLearningCaptionTimes('0,7,16', 2), [0, 7, 16]);
  assert.equal(parseLearningCaptionTimes('0,7,7', 2), null);
  assert.equal(parseLearningCaptionTimes('0,7', 2), null);
});
