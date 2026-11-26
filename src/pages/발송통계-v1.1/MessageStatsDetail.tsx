import Demographics from '../실시간통계-v1.1/Demographics';
import EstimatedResidence from '../실시간통계-v1.1/EstimatedResidence';
import { createPreviewReport } from '../실시간통계-v1.1/reportData';
import type { Report } from '../실시간통계-v1.1/reportData';
import '../실시간통계/report.css';
import '../실시간통계-v1.1/report-v11.css';
import './message-stats.css';

/** 발송메시지 확인 > 상세 화면에 연령·성비와 지역 분포를 넣는 목업. 수치는 모두 예시예요. */
const sends = { rcs: 484, sms: 184, total: 668, rcsReactions: 9, smsReactions: 2 };
const reads = [315, 328, 333, 337, 342, 343, 344];

// [연령, 남성 발송, 남성 반응, 여성 발송, 여성 반응]. ~10대는 20대에 합산해요.
const segments: Report['segments'] = ([
  ['20대', 52, 1, 68, 1],
  ['30대', 71, 1, 94, 2],
  ['40대', 88, 2, 112, 2],
  ['50대', 64, 1, 61, 1],
  ['60대 이상', 31, 0, 27, 0],
] as const).flatMap(([age, ms, mr, fs, fr]) => [
  { age, sex: '남성', delivered: ms, reactions: mr },
  { age, sex: '여성', delivered: fs, reactions: fr },
]);

const areas: Report['areas'] = ([
  ['경기', 189, 3], ['서울', 172, 4], ['부산', 44, 1], ['인천', 41, 1], ['경남', 38, 1], ['대구', 31, 0],
  ['경북', 27, 0], ['충남', 22, 1], ['대전', 21, 0], ['광주', 19, 0], ['충북', 17, 0], ['전북', 14, 0],
  ['전남', 12, 0], ['강원', 11, 0], ['울산', 7, 0], ['세종', 2, 0], ['제주', 1, 0],
] as const).map(([area, delivered, reactions]) => ({
  area, delivered, reactions, reactionRate: reactions / delivered * 100,
}));

const audienceReport: Report = { ...createPreviewReport(), segments, areas };

const percent = (part: number, total: number) => total > 0 ? (part / total * 100).toFixed(2) + '%' : '-';

function ReadStats() {
  const reactions = sends.rcsReactions + sends.smsReactions;
  const row = (read: number) => (
    <>
      <td>{read} 건</td><td>{percent(read, sends.rcs)}</td>
      <td>{sends.rcsReactions}</td><td>{percent(sends.rcsReactions, sends.rcs)}</td>
      <td>{sends.smsReactions}</td><td>{percent(sends.smsReactions, sends.sms)}</td>
      <td>{reactions}</td><td>{percent(reactions, sends.total)}</td>
    </>
  );
  return (
    <div className="msd-scroll">
      <table>
        <caption>통계정보 조회</caption>
        <thead>
          <tr>
            <th rowSpan={2}>통계 기간</th><th colSpan={3}>발송 수</th><th rowSpan={2}>읽음수</th><th rowSpan={2}>읽음률</th>
            <th rowSpan={2}>RCS 반응수</th><th rowSpan={2}>RCS 반응률</th><th rowSpan={2}>일반메시지 반응수</th>
            <th rowSpan={2}>일반메시지 반응률</th><th rowSpan={2}>총 반응수</th><th rowSpan={2}>총 반응률</th>
          </tr>
          <tr><th>RCS</th><th>문자메시지</th><th>총합</th></tr>
        </thead>
        <tbody>
          <tr><td /><td>{sends.rcs} 건</td><td>{sends.sms} 건</td><td>{sends.total} 건</td>{row(reads[reads.length - 1])}</tr>
          {reads.map((read, index) => (
            <tr key={index}><td className="msd-center">{index + 1}일</td><td /><td /><td />{row(read)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function MessageStatsDetail() {
  return (
    <main className="msd">
      <div className="msd-card">
        <ReadStats />
        <section className="msd-visual tw-report-v11" aria-label="연령·성비">
          <p className="msd-visual-title">연령·성비</p>
          <Demographics segments={segments} pending={false} />
        </section>
        <section className="msd-visual tw-report-v11" aria-label="지역 분포">
          <p className="msd-visual-title">지역 분포</p>
          <EstimatedResidence report={audienceReport} />
        </section>
        <div className="msd-scroll">
          <table>
            <caption>메시지 정보 수정 이력</caption>
            <thead><tr><th>일자</th><th>내용</th><th>변경자</th></tr></thead>
            <tbody><tr className="msd-center"><td>2026-05-28 13:03:00</td><td>고언연 검수 결과 메시지 내용 수정</td><td>SKT</td></tr></tbody>
          </table>
        </div>
        <div className="msd-scroll">
          <table>
            <caption>메시지 상태 이력</caption>
            <thead><tr><th>일자</th><th>내용</th><th>비고</th><th>파일 보기</th><th>담당자</th></tr></thead>
            <tbody>
              <tr className="msd-center"><td>2026-06-05 14:46:22</td><td>메시지 발송 승인 완료</td><td>관리자 캠페인 승인</td><td /><td>SKT</td></tr>
              <tr className="msd-center"><td>2026-05-28 13:03:00</td><td>고언연 캠페인 검수 완료</td><td>검수 완료</td><td /><td>SKT</td></tr>
            </tbody>
          </table>
        </div>
        <button type="button" className="msd-list">목록</button>
      </div>
    </main>
  );
}
