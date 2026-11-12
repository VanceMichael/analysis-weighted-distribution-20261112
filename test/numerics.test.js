import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { summarize } from '../src/domain.js';

const seed = JSON.parse(await readFile('data/records.json', 'utf8')).records[0];
const probe = patches => summarize(patches.map((patch, index) => ({...seed, id: `p${index}`, ...patch}))).groups[0];

test('运费核对使用频次权重，零频次不增加金额', () => {

  assert.equal(probe([{cents: 100, weight: 3}, {cents: 200, weight: 2}]).weightedCents, 700);
  assert.equal(probe([{cents: 999, weight: 0}]).weightedCents, 0);
});
