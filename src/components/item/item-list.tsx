"use client";

import {DragDropContext, Droppable} from "@hello-pangea/dnd";
import {toast} from "react-toastify";
import {useState} from "react";
import {CategoryItem} from "@/components/category/category-item";
import {TagItem} from "@/components/tag/tag-item";
import {NotFound} from "@/components/common/error";
import {reOrder} from "@/utils/array";
import {useIframeReloadContext} from "@/contexts/iframeReloadContext";
import updateItemSort from "@/actions/item/updateItemSort";

export type ItemListProps = {
  tenant: any;
  items: any[];
};

export const ItemList = ({tenant, items}: ItemListProps) => {
  const {reloadIframe} = useIframeReloadContext();

  const [dragItems, setDragItems] = useState(items);

  const count = items?.length || 0;
  const hasItems = count > 0;

  const onDragEnd = async (result: any) => {
    const {destination, source} = result;

    if (!destination) {
      return;
    }

    const items = reOrder(dragItems, source.index, destination.index);

    setDragItems(items);

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
    <div className="w-full">
      {!hasItems && <NotFound title={"No item found. Add one now!"} />}
      {hasItems && (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="grid grid-cols-1 gap-3"
              >
                {items.map((item: any, itemIndex: number) => {
                  if (item.kind === "category") {
                    return (
                      <CategoryItem
                        key={itemIndex}
                        category={item}
                        index={itemIndex}
                        tenant={tenant}
                      />
                    );
                  }

                  if (item.kind === "tag") {
                    return <TagItem key={itemIndex} index={itemIndex} tag={item} tenant={tenant} />;
                  }
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
};
ItemList.displayName = "ItemList";
