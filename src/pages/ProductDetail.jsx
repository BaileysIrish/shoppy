import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "../components/ui/Button";
import useCart from "../hooks/useCart";
export default function ProductDetail() {
  const { addOrUpdateItem } = useCart();
  const {
    state: {
      product: { id, image, title, description, category, price, options },
    },
  } = useLocation();
  const [success, setSuccess] = useState();
  const [selected, setSelected] = useState(options && options[0]);
  const handleSelect = (e) => setSelected(e.target.value);
  const handleClick = (e) => {
    const product = { id, image, title, price, option: selected, quantity: 1 };
    addOrUpdateItem.mutate(product, {
      onSuccess: () => {
        setSuccess("장바구니에 추가되었습니다.");
        setTimeout(() => setSuccess(null), 3000);
      },
    });
  };
  return (
    <section className="flex flex-col md:flex-row">
      <div className="w-7/12">
        <p className="font-bold my-4 ml-4">{title}</p>
        <div className="w-full px-4">
          <img src={image} alt={title} />
        </div>
      </div>
      <div className="ml-11 w-5/12 flex flex-col">
        <p className="mt-12 font-semibold mb-2">
          Product Info
          <span className="ml-2 font-normal text-sm text-gray-400 opacity-75">
            제품정보
          </span>
        </p>
        <ul>
          <li className="mb-2 flex ">
            <p className="mr-8 whitespace-nowrap">제품설명</p>
            <p className="font-bold truncate">{description}</p>
          </li>
          <li className="mb-2 flex">
            <p className="mr-16">성별</p>
            <p className="font-bold ">{category}</p>
          </li>
          <li className="mb-2 flex">
            <p className="mr-16">가격</p>
            <p className="font-bold">{price}</p>
          </li>
        </ul>
        <div className="flex items-center">
          <label htmlFor="select">옵션:</label>
          <select
            id="select"
            className="p-2 m-4 flex-1 border-2 border-dashed border-brand outline-none"
            onChange={handleSelect}
            value={selected}
          >
            {options &&
              options.map((option, index) => (
                <option key={index}>{option}</option>
              ))}
          </select>
        </div>
        {success && <p className="my-2 text-lg font-semibold">{success}</p>}
        <Button text="장바구니에 추가" onClick={handleClick} />
      </div>
    </section>
  );
}
