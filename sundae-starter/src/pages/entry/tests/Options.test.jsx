import { render, screen } from "../../../test-utils/testing-library-utils";
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

test("서버가 반환한 토핑 이미지 표시", async () => {
  render(<Options optionType="toppings" />);

  const images = await screen.findAllByRole("img", { name: /topping$/i });
  // 이미지를 받는지 확인
  expect(images).toHaveLength(3);

  // 이미지의 대체 텍스트 확인
  const imageTitles = images.map((img) => img.alt);
  expect(imageTitles).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping",
  ]);
});
