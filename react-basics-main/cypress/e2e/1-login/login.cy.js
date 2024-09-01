describe("로그인 화면", () => {
  it("사용자는 아이디와 비밀번호를 사용해서 로그인한다", () => {
    // given - 로그인 페이지에 접근한다
    // cypress에게 /login 경로로 이동하라고 지시
    cy.visit("/login");
    // [data-cy=emailInput] : css선택자로 data-cy 속성이 emailInput인 요소를 찾음
    // as("emailInput") : 선택된 요소에 emailInput이라는 별칭을 부여. 이후에 @emailInput으로 이 요소를 참조할 수 있음
    cy.get("[data-cy=emailInput]").as("emailInput");
    cy.get("[data-cy=passwordInput").as("passwordInput");

    // when - 아이디와 비밀번호를 입력하고 로그인 버튼을 클릭한다
    // type('test@email.com') : 선택된 요소에 'test@email.com' 이라는 텍스트를 입력
    cy.get("@emailInput").type("test@email.com");
    cy.get("@passwordInput").type("password");

    // .invoke("val") : 선택된 요소의 value 속성 값을 가져옴
    // .should("eq", "test@email.com") : 가져온 값이 "test@email.com"과 정확히 일치하는지 확인 (eq: equal to)
    cy.get("@emailInput").invoke("val").should("eq", "test@email.com");

    cy.get("@passwordInput").invoke("val").should("eq", "password");

    // cy.intercept(): Cypress에서 네트워크 요청을 가로채고 조작하는 메서드
    // 첫 번째 인자: 인터셉트할 요청의 조건을 지정합니다.
    // method: "POST": HTTP POST 메서드를 사용하는 요청을 대상으로 지정
    // url: "/user/login": URL이 "/user/login"인 요청을 대상으로 지정
    // 두 번째 인자: 인터셉트된 요청에 대한 응답을 정의
    // { token: "AUTH_TOKEN" }: 서버로부터의 응답을 이 객체로 대체. 여기서는 "AUTH_TOKEN"이라는 값을 가진 token 필드를 포함하는 객체를 반환
    // .as("login"): 이 인터셉트에 "login"이라는 별칭을 지정. 이를 통해 나중에 테스트에서 이 인터셉트를 참조할 수 있음
    cy.intercept(
      {
        method: "POST",
        url: "/user/login",
      },
      { token: "AUTH_TOKEN" }
    ).as("login");

    // shoud("exist") : 선택된 요소가 DOM에 존재하는지 확인
    cy.get("[data-cy=loginButton").should("exist").click();

    // then - 로그인에 성공하고 메인화면으로 이동한다
    cy.url().should("include", "http://localhost:5173/");
    // cy.url : 현재 페이지의 url을 가져옴
    // should는 cypress의 assertion
  });
});
