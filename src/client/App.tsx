import React, { useState } from 'react';
import { useQuery } from 'react-query';
// Components
import Item from './Cart/Item/Item';
import Cart from './Cart/Cart';
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RestoreIcon from '@material-ui/icons/Restore';
import Badge from '@material-ui/core/Badge';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import ClickAwayListener from 
    "@material-ui/core/ClickAwayListener";
// Styles
import { Wrapper, StyledButton, orderCellColor, orderCellPadding,tableWidth, StyledAppBar, HeaderTypography, StyledRecentPurchaseDialog } from './App.styles';
import {  DialogContent, Toolbar, Typography } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// Types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const getCheeses = async (): Promise<CartItemType[]> =>
  await (await fetch(`api/cheeses`)).json();

export interface RecentPurchasesProps {
  open: boolean;
  recentPurchaseItems: any[];
}

function RecentPurchaseDialog(props: RecentPurchasesProps) {
  const { open, recentPurchaseItems } = props;
  const calculateTotal = (amount: number, price: number) =>{
    return amount * price;
  }
  return (
    <Dialog open={open} max-width="30rem;">
      <DialogTitle>Recent Purchases</DialogTitle>
      <StyledRecentPurchaseDialog>
      <DialogContent >
      <TableContainer style={{...tableWidth}}>
        <Table >
        <TableHead>
        <TableRow>
            <TableCell align="left"><strong>Item Name</strong></TableCell>
            <TableCell align="left"><strong>Quantity</strong></TableCell>
            <TableCell align="left"><strong>Total Price</strong></TableCell>
            <TableCell align="left"><strong>Image</strong></TableCell>
        </TableRow>
        </TableHead>
        <TableBody>
        {recentPurchaseItems.length != 0? recentPurchaseItems?.map((order, index) => (
          <>
            <TableRow key={order}>
            <TableCell style={{...orderCellColor, ...orderCellPadding}} align="center"  colSpan={4}><strong>Order Number: {index+1}</strong></TableCell>
            </TableRow>
            {
              order.items?.map((item:any) =>(
                <TableRow key={order}>
                <TableCell component="th" scope="row" >{item.title}</TableCell>
                <TableCell align="left">{item.amount}&nbsp;</TableCell>
                <TableCell align="left">${calculateTotal(item.amount,item.price).toFixed(2)}</TableCell>
                <TableCell align="left" ><img  src={item.image} alt={item.title} /></TableCell>
                </TableRow>
              ))
            }
            </>
        )) : <TableRow >
          <TableCell align="center"  colSpan={4}>Your purchase history will show here.</TableCell>
          </TableRow>}
        </TableBody>
        </Table>
      </TableContainer>
  </DialogContent>
  </StyledRecentPurchaseDialog>
    </Dialog>


  );
}


const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const [recentPurchaseItems, setRecentPurchaseItems] = useState([] as []);
  const [purchaseSuccess, setPurchaseSuccess] =  useState(false);
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'cheeses',
    getCheeses
  );
  const [recentPurchaseOpen, setOpen] = React.useState(false);

  const handleClickAway = () => {
    setOpen(false);
  };
  

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);

  const handleAddToCart = (clickedItem: CartItemType) => {
    setPurchaseSuccess(false);
    setCartItems(prev => {
      // 1. Is the item already added in the cart?
      const isItemInCart = prev.find(item => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map(item =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      // First time the item is added
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  };

  const handlePurchase = (items: CartItemType[]) =>{
 
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: items })
  
      };

      fetch('api/purchase',requestOptions)
        .then(response => response)
        .then(result => {
          console.log('Success:', result);
          // set purchase state to success
          setPurchaseSuccess(true);
          // resent cart items
          setCartItems([]);

        })
        .catch(error => {
          console.error('Error:', error);
        });


  }


  const handleRecentPurchases = () =>{
      fetch('/api/recent-purchases')
        .then(response => response.json())
        .then(result => {
          // set items from server
          if(result.status == 200){
            setRecentPurchaseItems(result.data)
            setOpen(true);
          }
          

        })
        .catch(error => {
          console.error('Error:', error);
        });
  
    }
  
  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong ...</div>;

  return (

    <Wrapper>
  
      <StyledAppBar position="static">
      <ClickAwayListener onClickAway={handleClickAway}>
        <Toolbar>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <StyledButton  onClick={() => handleRecentPurchases()}>
              <RestoreIcon />
              <Typography variant="subtitle2">
                Recent Purchases
              </Typography>
            </StyledButton>
            <Typography variant="subtitle2">
                Recent Purchases
              </Typography>
           

            <HeaderTypography variant="h3" noWrap>
              Welcome to Patient Zero's Cheeseria
            </HeaderTypography>

            <StyledButton onClick={() => setCartOpen(true)} data-cy={`open-shopping-cart`}>
              <Badge
                badgeContent={getTotalItems(cartItems)}
                color='error'
                data-cy="badge-count">
                <AddShoppingCartIcon />
              </Badge>

              <Typography variant="subtitle2">
                Cart
              </Typography>
            </StyledButton>

          </Grid>
        </Toolbar>
        </ClickAwayListener>
      </StyledAppBar>

      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
          purchase={handlePurchase}
          purchaseSuccess={purchaseSuccess}
        />
      </Drawer>

      <RecentPurchaseDialog open={recentPurchaseOpen} recentPurchaseItems={recentPurchaseItems}
      />     
      <Grid container spacing={3}>
        {data?.map(item => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
     

    </Wrapper>

  );
};

export default App;

