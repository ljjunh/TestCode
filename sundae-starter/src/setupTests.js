import "@testing-library/jest-dom";

import { beforeAll, afterEach, afterAll } from "vitest";
import { server } from "./mocks/server";

// 모든 테스트가 시작되기 전에 MSW 서버를 시작해서 API 요청을 가로챌 준비
beforeAll(() => server.listen());

// 각 테스트가 끝난 후 핸들러를 초기화
// 한 테스트에서 변경된 핸들러가 다른 테스트에 영향을 주지 않도록 하기 위해
afterEach(() => server.resetHandlers());

// 모든 테스트가 완료된 후 MSW 서버를 종료하여 리소스를 정리
afterAll(() => server.close());
