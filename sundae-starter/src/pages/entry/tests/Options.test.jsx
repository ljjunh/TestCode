import { render, screen } from "@testing-library/react";
import Options from "../Options";

test("서버가 반환한 아이스크림 종류별로 이미지를 표시", async () => {
  render(<Options optionType="scoops" />);

  // 이미지를 받는지 확인
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // 이미지의 대체 텍스트 확인
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});
