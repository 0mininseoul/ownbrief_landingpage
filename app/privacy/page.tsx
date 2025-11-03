import Link from 'next/link'

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white">
      <div className="px-4 md:px-8 max-w-4xl mx-auto py-16">
        <Link href="/" className="text-black hover:text-gray-600 mb-8 inline-block">
          ← 홈으로 돌아가기
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold text-black mb-8">
          개인정보처리방침
        </h1>

        <div className="space-y-8 text-gray-800">
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">1. 개인정보의 수집 및 이용 목적</h2>
            <p className="leading-relaxed">
              온브리프(이하 "회사")는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>서비스 정식 런칭 안내</li>
              <li>마케팅 및 광고 활용</li>
              <li>고객 문의 응대</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4">2. 수집하는 개인정보 항목</h2>
            <p className="leading-relaxed">
              회사는 랜딩페이지를 통해 다음의 개인정보를 수집합니다:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li><strong>필수 항목:</strong> 이메일 주소</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4">3. 개인정보의 보유 및 이용 기간</h2>
            <p className="leading-relaxed">
              회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li><strong>이메일 구독 정보:</strong> 구독 해지 시까지 또는 서비스 종료 시까지</li>
              <li>단, 관련 법령에 따라 보존할 필요가 있는 경우 해당 기간 동안 보관합니다.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4">4. 개인정보의 제3자 제공</h2>
            <p className="leading-relaxed">
              회사는 정보주체의 개인정보를 제1조(개인정보의 처리 목적)에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 「개인정보 보호법」 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.
            </p>
            <p className="mt-4 font-semibold">
              현재 회사는 개인정보를 제3자에게 제공하지 않습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4">5. 개인정보처리의 위탁</h2>
            <p className="leading-relaxed">
              회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li><strong>수탁업체:</strong> Supabase</li>
              <li><strong>위탁업무 내용:</strong> 이메일 데이터 저장 및 관리</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4">6. 정보주체의 권리·의무 및 행사방법</h2>
            <p className="leading-relaxed">
              정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>개인정보 열람 요구</li>
              <li>오류 등이 있을 경우 정정 요구</li>
              <li>삭제 요구</li>
              <li>처리정지 요구</li>
            </ul>
            <p className="mt-4">
              위 권리 행사는 회사에 대해 서면, 전화, 전자우편 등을 통하여 하실 수 있으며 회사는 이에 대해 지체 없이 조치하겠습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4">7. 개인정보의 파기</h2>
            <p className="leading-relaxed">
              회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체 없이 해당 개인정보를 파기합니다.
            </p>
            <div className="mt-4">
              <p className="font-semibold mb-2">파기절차:</p>
              <p className="leading-relaxed">
                이용자가 입력한 정보는 목적 달성 후 별도의 DB에 옮겨져(종이의 경우 별도의 서류) 내부 방침 및 기타 관련 법령에 따라 일정기간 저장된 후 혹은 즉시 파기됩니다.
              </p>
            </div>
            <div className="mt-4">
              <p className="font-semibold mb-2">파기방법:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>전자적 파일 형태: 기록을 재생할 수 없도록 영구삭제</li>
                <li>종이 문서: 분쇄기로 분쇄하거나 소각</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4">8. 개인정보 보호책임자</h2>
            <p className="leading-relaxed">
              회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
            </p>
            <div className="mt-4 bg-gray-50 p-6 rounded-lg">
              <p><strong>개인정보 보호책임자</strong></p>
              <p className="mt-2">이메일: contact@ownbrief.com</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4">9. 개인정보처리방침 변경</h2>
            <p className="leading-relaxed">
              이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
            </p>
          </section>

          <section className="border-t pt-8 mt-12">
            <p className="text-sm text-gray-600">
              <strong>시행일자:</strong> 2025년 1월 1일
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
