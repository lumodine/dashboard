"use client";

import {DragDropContext, Droppable} from "@hello-pangea/dnd";
import {toast} from "react-toastify";
import {useState} from "react";
import {ProductItem} from "./product-item";
import {NotFound} from "@/components/common/error";
import {reOrder} from "@/utils/array";
import {useIframeReloadContext} from "@/contexts/iframeReloadContext";
import updateItemSort from "@/actions/item/updateItemSort";

export type ProductListProps = {
  tenant: any;
  category: any;
  products: any[];
};

export const ProductList = ({tenant, category, products}: ProductListProps) => {
  const {reloadIframe} = useIframeReloadContext();

  const [dragProducts, setDragProducts] = useState(products);

  const count = products?.length || 0;
  const hasProducts = count > 0;

  const onDragEnd = async (result: any) => {
    const {destination, source} = result;

    if (!destination) {
      return;
    }

    const items = reOrder(dragProducts, source.index, destination.index);

    setDragProducts(items);

    const orderedItems = items.map((item: any, index: number) => {
      return {
        itemId: item._id,
        sort: index,
      };
    });

    const response = await updateItemSort(tenant._id, orderedItems);

    if (response.message) {
      toast(response.message, {
        type: response.success ? "success" : "error",
      });
    }

    reloadIframe();
  };

  return (
    <>
      {!hasProducts && <NotFound title={"No product found. Add one now!"} />}

      {hasProducts && (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="grid grid-cols-1 gap-3"
              >
                {products.map((product: any, productIndex: number) => (
                  <ProductItem
                    key={productIndex}
                    category={category}
                    index={productIndex}
                    product={product}
                    tenant={tenant}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </>
  );
};
ProductList.displayName = "ProductList";
