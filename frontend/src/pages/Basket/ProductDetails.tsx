import { BasketItem } from "../../components/Context/BasketContext.tsx";
import style from "./ProductDetails.module.css";

const ProductDetails = ({ item }: { item: BasketItem }) => {
  function calculateDiscount(item: BasketItem): number {
    if (item.finalPrice) {
      return item.finalPrice;
    }
    if (item.discount.hasDiscount) {
      return item.price - (item.price * item.discount.amount) / 100;
    }
    return item.price;
  }

  const renderCommonDetails = (item: BasketItem) => {
    const discountedPrice = calculateDiscount(item);

    return (
      <div className={style.commonDetails}>
        <strong>Price:</strong> {discountedPrice}
      </div>
    );
  };

  const renderProductType = (item: BasketItem) => {
    switch (item.type) {
      case "brushes":
        return (
          <div className={style.cardContainer}>
            <div className={style.nameFirm}>
              <div className={style.name}>
                <strong>Name:</strong> {item.name}
              </div>
              <div className={style.firm}>
                <strong>Firm:</strong> {item.firm}
              </div>
            </div>
            <div className={style.modelSize}>
              <div className={style.model}>
                <strong>Model:</strong> {item.model}
              </div>
              <div className={style.size}>
                <strong>Size:</strong> {`[${item.size[0]}, ${item.size[1]}]`}
              </div>
            </div>
            <div className={style.machineModels}>
              <div>
                <strong>Machine Models:</strong>
              </div>
              <ul className={style.modelList}>
                {item.machineModels.map((model, index) => (
                  <li key={index}>{model}</li>
                ))}
              </ul>
            </div>
            <div className={style.peculiarities}>
              <div>
                <strong>Peculiarities:</strong> {item.peculiarities}
              </div>
            </div>
          </div>
        );

      case "filters":
        return (
          <div className={style.cardContainer}>
            <div className={style.detailSection}>
              <div className={style.detail}>
                <strong>Name:</strong> {item.name}
              </div>
              <div className={style.detail}>
                <strong>Firm:</strong> {item.firm}
              </div>
            </div>
            <div className={style.sizePressure}>
              <div className={style.size}>
                <strong>Model:</strong> {item.model}
              </div>
              <div className={style.pressure}>
                <strong>Size:</strong> {`[${item.size.join(", ")}]`}
              </div>
            </div>
            <div className={style.sizePressure}>
              <div className={style.pressure}>
                <strong>Water Pressure:</strong>{" "}
                {`[${item.waterPressure.join(" - ")}] bar`}
              </div>
              <div className={style.fitting}>
                <strong>With Fitting:</strong> {item.withFitting ? "Yes" : "No"}
              </div>
            </div>
            <div className={style.machineModels}>
              <div>
                <strong>Machine Models:</strong>
              </div>
              <ul className={style.modelList}>
                {item.machineModels.map((model, index) => (
                  <li key={index}>{model}</li>
                ))}
              </ul>
            </div>
            <div className={style.peculiarities}>
              <div>
                <strong>Peculiarities:</strong> {item.peculiarities || "None"}
              </div>
            </div>
          </div>
        );

      case "guides":
        return (
          <div className={style.cardContainer}>
            <div className={style.detailSection}>
              <div className={style.detail}>
                <strong>Name:</strong> {item.name}
              </div>
              <div className={style.detail}>
                <strong>Firm:</strong> {item.firm}
              </div>
            </div>
            <div className={style.sizePressure}>
              <div className={style.size}>
                <strong>Model:</strong> {item.model}
              </div>
              <div className={style.size}>
                <strong>Size:</strong> {`[${item.size.join(", ")}]`}
              </div>
            </div>
            <div className={style.machineModels}>
              <div>
                <strong>Machine Models:</strong>
              </div>
              <ul className={style.modelList}>
                {item.machineModels.map((model, index) => (
                  <li key={index}>{model}</li>
                ))}
              </ul>
            </div>
            <div className={style.peculiarities}>
              <div>
                <strong>Peculiarities:</strong> {item.peculiarities || "None"}
              </div>
            </div>
          </div>
        );
      case "resin":
        return (
          <div className={style.cardContainer}>
            <div className={style.detailSection}>
              <div className={style.detail}>
                <strong>Name:</strong> {item.name}
              </div>
              <div className={style.detail}>
                <strong>Firm:</strong> {item.firm}
              </div>
            </div>
            <div className={style.peculiarities}>
              <div className={style.detail}>
                <strong>Model:</strong> {item.model}
              </div>
              <div>
                <strong>Peculiarities:</strong> {item.peculiarities || "None"}
              </div>
            </div>
          </div>
        );

      case "wires":
        return (
          <div className={style.cardContainer}>
            <div className={style.detailSection}>
              <div className={style.detail}>
                <strong>Name:</strong> {item.name}
              </div>
              <div className={style.detail}>
                <strong>Firm:</strong> {item.firm}
              </div>
            </div>
            <div className={style.peculiarities}>
              <div className={style.detail}>
                <strong>Model:</strong> {item.model}
              </div>
              <div>
                <strong>Peculiarities:</strong> {item.peculiarities || "None"}
              </div>
            </div>
          </div>
        );

      case "nozzles":
        return (
          <div className={style.cardContainer}>
            <div className={style.detailSection}>
              <div className={style.detail}>
                <strong>Name:</strong> {item.name}
              </div>
              <div className={style.detail}>
                <strong>Firm:</strong> {item.firm}
              </div>
            </div>
            <div className={style.peculiarities}>
              <div className={style.detail}>
                <strong>Model:</strong> {item.model}
              </div>
              <div>
                <strong>Peculiarities:</strong> {item.peculiarities || "None"}
              </div>
            </div>
          </div>
        );
      default:
        return <div>Неизвестный тип продукта</div>;
    }
  };

  return (
    <div className={style.сontainer}>
      {renderProductType(item)}
      <div className={style.сontainerPrice}>{renderCommonDetails(item)}</div>
    </div>
  );
};

export default ProductDetails;
