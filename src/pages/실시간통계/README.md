# 비즈팅 실시간 통계리포트 목업

저장소에서 `npm run dev`를 실행하고 `/biztinginterest/#/real-time-statistics`를 엽니다. 미리보기 인증번호는 `246810`입니다.

실시간·일간·지역 통계는 예시 데이터를 사용합니다. 새로고침 버튼은 미리보기 기준 시각을 갱신합니다. 일간 그래프와 표는 각 날짜의 누적 읽음수와 총 반응수를 그대로 표시합니다. 다음 날 오전 4시 30분이 지나면 집계된 값을 보여주고, 누락되거나 앞선 누적값보다 작은 항목은 ‘집계 중’으로 표시합니다.

`daily`의 `readCount`와 `reactionCount`는 `date`까지의 누적 건수입니다. `summary.rcsDeliveredCount`가 있으면 읽음률의 분모로 사용합니다. 총 반응률은 전체 발송 성공 건수 기준입니다.

연령·성별과 지역 데이터의 예시는 `demo-demographics.json`과 `demo-residence.json`에 있습니다. 둘 다 첨부받은 `list` 형식을 사용합니다.

## 예외 케이스 테스트

저장소 루트에서 실행합니다.

```sh
node --test "src/pages/실시간통계/report.test.mjs"
```

미리보기 인증번호 오류, 0건과 누락, 일간 집계 시각, 연령 및 지역 집계를 검사합니다.
