import { memo } from 'react';

type ItemProps = {
  title: string;
  addItemToWishList: (item: string) => void;
  countItemWithOne: {
    count: number
  }
}

function ItemComponent(props: ItemProps) {
  return (
    <li>
      {props.title} {props.countItemWithOne.count}
      <button onClick={() => props.addItemToWishList(props.title)}>
        add to wishlist
      </button>
    </li>
  );
}

type AreEqualFC<T> = (prevProps: T, nextState: T) => boolean;
const areEqual: AreEqualFC<ItemProps> = (prevProps, nextProps) => {
  if (
    prevProps.title !== nextProps.title ||
    prevProps.countItemWithOne.count !== nextProps.countItemWithOne.count
  ) {
    return true
  }

  return false;
}

export const Item = memo(ItemComponent, areEqual);
