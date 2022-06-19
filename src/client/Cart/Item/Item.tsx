import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import ClickAwayListener from 
    "@material-ui/core/ClickAwayListener";
// Types
import { CartItemType } from '../../App';
// Styles
import { Container, Wrapper } from './Item.styles';
import React from 'react';

export interface ItemDialogProps {
  open: boolean;
  item: CartItemType;
  onClose: () => void;
}

function ItemDialog(props: ItemDialogProps) {
  const { open, item } = props;

  return (
    <Dialog open={open} max-width="30rem;">
      <Container >
      <DialogTitle>{item.title}</DialogTitle>
      <DialogContent >
      <div style={{textAlign: "center"}}>
      <img src={item.image} alt={item.title} />
      </div>
        <p><strong>Category: </strong>{item.category}</p>
        {item.description}
        <p><strong>Price: $</strong>{item.price}</p>
      </DialogContent>
         </Container >
    </Dialog>
  );
}


type Props = {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void;
};


const Item: React.FC<Props> = ({ item, handleAddToCart }) => {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickAway = () => {
    setOpen(false);
  };
  
  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  return(
    <Wrapper >
      <ClickAwayListener onClickAway={handleClickAway}>
        <div onClick={handleClick}>
        <img width="100%" src={item.image} alt={item.title} />
        <h3>{item.title}</h3>
        <h3>${item.price}</h3>
        </div>
      </ClickAwayListener>
      <Button
        onClick={() => handleAddToCart(item)}
        data-cy={`add-to-cart-${item.id}`}>
          Add to cart
      </Button>
        <ItemDialog
        open={open}
        item={item}
        onClose={handleClose}
      />
  </Wrapper>
  );

};



export default Item;
