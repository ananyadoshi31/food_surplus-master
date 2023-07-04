// import { View, Text ,TextInput,StyleSheet,Button, Alert} from 'react-native'
// import React,{useState} from 'react'
// import { StripeProvider } from '@stripe/stripe-react-native'
// import { CardField ,useConfirmPayment} from '@stripe/stripe-react-native'
// import ProductsScreen from './ProductScreen'

// //ADD localhost address of your server
// const API_URL = "http://192.168.48.150:3000/";

// const StripeScreen = (props) => {
// // const [email, setEmail] = useState();
// // const [cardDetails, setCardDetails] = useState();
// //   const { confirmPayment, loading } = useConfirmPayment();

// //   const fetchPaymentIntentClientSecret = async () => {
// //     const response = await fetch(`${API_URL}/create-payment-intent`, {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //     });
// //     const { clientSecret, error } = await response.json();
// //     return { clientSecret, error };
// //   };

// //   const handlePayPress = async () => {
// //     //1.Gather the customer's billing information (e.g., email)
// //     if (!cardDetails?.complete || !email) {
// //       Alert.alert("Please enter Complete card details and Email");
// //       return;
// //     }
// //     const billingDetails = {
// //       email: email,
// //     };
// //     //2.Fetch the intent client secret from the backend
// //     try {
// //       const { clientSecret, error } = await fetchPaymentIntentClientSecret();
// //       //2. confirm the payment
// //       if (error) {
// //         console.log("Unable to process payment");
// //       } else {
// //         const { paymentIntent, error } = await confirmPayment(clientSecret, {
// //           type: "Card",
// //           billingDetails: billingDetails,
// //         });
// //         if (error) {
// //           alert(`Payment Confirmation Error ${error.message}`);
// //         } else if (paymentIntent) {
// //           alert("Payment Successful");
// //           console.log("Payment successful ", paymentIntent);
// //         }
// //       }
// //     } catch (e) {
// //       console.log(e);
// //     }
// //     //3.Confirm the payment with the card details
// //   };
// // ***************************************************************************
// const products = [{
//   price: 10,
//   name: 'Pizza Pepperoni',
//   id: 'pizza-pepperoni',
// }, {
//   price: 12,
//   name: 'Pizza 4 Fromaggi',
//   id: 'pizza-fromaggi'
// }, {
//   price: 8,
//   name: 'Pizza BBQ',
//   id: 'pizza-bbq'
// }]

// const [screenProps, setScreenProps] = React.useState(null);

//     const navigateToCheckout = (screenProps) => {
//         setScreenProps(screenProps)
//     }

//     const navigateBack = () => {
//         setScreenProps(null);
//     }


//   return (
//     <StripeProvider
//     merchantIdentifier="yourMerchantIdentifier"
//     // publishableKey='pk_test_51KcRPkSGmv1wnKmRALjzzU8KpZbK3bu8xESTCT7NTNu4O8DMh0WFj2ghJa92IftEr4lDw6exLz5UxOxtUkByH42x00woVxgN2I'
//     >
//         {/* <View style={styles.container}>
//         <TextInput
//         autoCapitalize="none"
//         placeholder="E-mail"
//         keyboardType="email-address"
//         onChange={value => setEmail(value.nativeEvent.text)}
//         style={styles.input}
//       />
//       <CardField
//         postalCodeEnabled={true}
//         placeholder={{
//           number: "4242 4242 4242 4242",
//         }}
//         cardStyle={styles.card}
//         style={styles.cardContainer}
//         onCardChange={cardDetails => {
//           setCardDetails(cardDetails);
//         }}
//       />
//       <Button onPress={handlePayPress} title="Pay" disabled={loading} />
//         </View> */}
// {/* ****************************************************************** */}
// <View style={styles.container}>
//             {!screenProps &&
//                 <ProductsScreen
//                 products={products}
//                 navigateToCheckout={navigateToCheckout} />
//             }
//             { !!screenProps &&
//                 <CheckoutScreen
//                     {...screenProps}
//                     navigateBack={navigateBack}/>
//             }
//         </View>

//     </StripeProvider>
   
//   )
// }

// const styles=StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: "center",
//         margin: 20,
//         // marginTop:100
//       },
//       input: {
//         backgroundColor: "#efefefef",
    
//         borderRadius: 8,
//         fontSize: 20,
//         height: 50,
//         padding: 10,
//       },
//       card: {
//         backgroundColor: "#efefefef",
//       },
//       cardContainer: {
//         height: 50,
//         marginVertical: 30,
//       },
// })

// export default StripeScreen



// ************************************************************************************
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, Pressable, Platform } from 'react-native';
import { StripeProvider } from '@stripe/stripe-react-native';
import { initStripe, useStripe } from '@stripe/stripe-react-native';

const publishableKey='pk_test_51KcRPkSGmv1wnKmRALjzzU8KpZbK3bu8xESTCT7NTNu4O8DMh0WFj2ghJa92IftEr4lDw6exLz5UxOxtUkByH42x00woVxgN2I';
clientSecret='sk_test_51KcRPkSGmv1wnKmRAPdHYtCx7mi8C5ayg05ah88lcd0wgNtv7sljDgTq070jj8HMed58WQMVXa77M81BoCZCy3SP000Ry7Pwlh';
const ProductRow = ({ product, cart, setCart }) => {
    const modifyCart = (delta) => {
        setCart({ ...cart, [product.id]: cart[product.id] + delta })
    }
    return (
        <View style={styles.productRow}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 17, flexGrow: 1 }}>
                    {product.name} - {product.price}$
                </Text>
                <Text style={{ fontSize: 17, fontWeight: "700" }}>
                    {cart[product.id]}
                </Text>
            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 8
            }}>
                <Button
                    disabled={cart[product.id] <= 0}
                    title="Remove"
                    onPress={() => modifyCart(-1)} />
                <Button
                    title="Add"
                    onPress={() => modifyCart(1)} />
            </View>
        </View>
    )
}

const ProductsScreen = ({ products, navigateToCheckout }) => {
    /**
     * We will save the state of the cart here
     * It will have the inital shape:
     * {
     *  [product.id]: 0
     * }
     */
    const [cart, setCart] = React.useState(
        Object.fromEntries(products.map(p => [p.id, 0]))
    );

    const handleContinuePress = async () => {
        /* Send the cart to the server */
        // const URL = 'https://domain.tld/api/create-payment-intent'
        const URL = "http://192.168.1.4:19000/";
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application-json'
            },
            body: JSON.stringify(cart)
        })

        /* Await the response */
        const {
            publishableKey,
            clientSecret,
            merchantName
        } = await response.json();

        /* Navigate to the CheckoutScreen */
        /* You can use navigation.navigate from react-navigation */
        navigateToCheckout({
            publishableKey,
            clientSecret,
            merchantName,
            cart,
            products
        });
    }

    return (
        <View style={styles.screen}>
            {
                products.map((p) => {
                    return <ProductRow
                        key={p.id}
                        product={p}
                        cart={cart}
                        setCart={setCart} />
                })
            }
            <View style={{ marginTop: 16 }}>
                <Button title="Continue" onPress={handleContinuePress} />
            </View>
        </View>
    )
}

/**
 * CheckoutScreen related components
 */

const CartInfo = ({ products, cart }) => {
    return <View>
        {
            Object.keys(cart).map(productId => {
                const product = products.filter(p => p.id === productId)[0];
                const quantity = cart[productId];
                return (
                    <View
                        key={productId}
                        style={[{ flexDirection: 'row' }, styles.productRow]}>
                        <Text style={{ flexGrow: 1, fontSize: 17 }}>
                            {quantity} x {product.name}
                        </Text>
                        <Text style={{ fontWeight: "700", fontSize: 17 }}>
                            {quantity * product.price}$
                        </Text>
                    </View>
                )
            })
        }
    </View>
}

const MethodSelector = ({ onPress, paymentMethod }) => {
    // ...
    return (
        <View style={{ marginVertical: 48, width: '75%' }}>
            <Text style={{
                fontSize: 14,
                letterSpacing: 1.5,
                color: 'black',
                textTransform: 'uppercase'
            }}>
                Select payment method
            </Text>
            {/* If there's no paymentMethod selected, show the options */}
            {!paymentMethod &&
                <Pressable
                    onPress={onPress}
                    style={{
                        flexDirection: 'row',
                        paddingVertical: 8,
                        alignItems: 'center',
                    }}>
                    {
                        Platform.select({
                            ios: (<ApplePayMark height={59} />),
                            android: (<GooglePayMark height={59} />)
                        })
                    }

                    <View style={[styles.selectButton, { marginLeft: 16 }]}>
                        <Text style={[styles.boldText, { color: '#007DFF' }]}>Card</Text>
                    </View>
                </Pressable>
            }
            {/* If there's a paymentMethod selected, show it */}
            {!!paymentMethod &&
                <Pressable
                    onPress={onPress}
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingVertical: 8,
                    }}>
                    {paymentMethod.label.toLowerCase().includes('apple') &&
                        <ApplePayMark height={59} />
                    }
                    {paymentMethod.label.toLowerCase().includes('google') &&
                        <GooglePayMark height={59} />
                    }
                    {!paymentMethod.label.toLowerCase().includes('google') &&
                        !paymentMethod.label.toLowerCase().includes('apple') &&
                        <View style={[styles.selectButton, { marginRight: 16 }]}>
                            <Text style={[styles.boldText, { color: '#007DFF' }]}>
                                {paymentMethod.label}
                            </Text>
                        </View>
                    }
                    <Text style={[styles.boldText, { color: '#007DFF', flex: 1 }]}>
                        Change payment method
                    </Text>
                </Pressable>
            }
        </View>
    )
}

const CheckoutScreen = ({
    products,
    navigateBack,
    publishableKey,
    clientSecret,
    merchantName,
    cart }) => {

    // We will store the selected paymentMethod
    const [paymentMethod, setPaymentMethod] = React.useState();

    // Import some stripe functions
    const {
        initPaymentSheet,
        presentPaymentSheet,
        confirmPaymentSheetPayment,
    } = useStripe();


    // Initialize stripe values upon mounting the screen
    React.useEffect(() => {
        (async () => {
            await initStripe({
                publishableKey,
                // Only if implementing applePay
                // Set the merchantIdentifier to the same
                // value in the StripeProvider and
                // striple plugin in app.json
                merchantIdentifier: 'yourMerchantIdentifier'
            });

            // Initialize the PaymentSheet with the paymentIntent data,
            // we will later present and confirm this
            await initializePaymentSheet();
        })();
    }, []);

    const initializePaymentSheet = async () => {
        const { error, paymentOption } = await initPaymentSheet({
            paymentIntentClientSecret: clientSecret,
            customFlow: true,
            merchantDisplayName: merchantName,
            style: 'alwaysDark', // If darkMode
            googlePay: true, // If implementing googlePay
            applePay: true, // If implementing applePay
            merchantCountryCode: 'ES', // Countrycode of the merchant
            testEnv: __DEV__, // Set this flag if it's a test environment
        });
        if (error) {
            console.log(error)
        } else {
            // Upon initializing if there's a paymentOption
            // of choice it will be filled by default
            setPaymentMethod(paymentOption);
        }
    };

    const handleSelectMethod = async () => {
        const { error, paymentOption } = await presentPaymentSheet({
            confirmPayment: false,
        });
        if (error) {
            alert(`Error code: ${error.code}`, error.message);
        }
        setPaymentMethod(paymentOption);
    }

    const handleBuyPress = async () => {
        if (paymentMethod) {
            const response = await confirmPaymentSheetPayment();
    
            if (response.error) {
                alert(`Error ${response.error.code}`);
                console.error(response.error.message);
            } else {
                alert('Purchase completed!');
            }
        }
    }

    return (
        <View style={styles.screen}>
            <CartInfo cart={cart} products={products} />
            <MethodSelector
                onPress={handleSelectMethod}
                paymentMethod={paymentMethod}
            />
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignSelf: 'stretch',
                marginHorizontal: 24,
            }}>
                <Pressable onPress={navigateBack}>
                    <Text style={[styles.textButton, styles.boldText]}>
                        Back
                    </Text>
                </Pressable>
                <Pressable style={styles.buyButton} onPress={handleBuyPress}>
                    <Text
                        style={[styles.boldText, { color: 'white'}]}>
                        Buy
                    </Text>
                </Pressable>
                
            </View>
        </View>
    )
}

const StripeScreen = () => {
    const products = [{
        price: 10,
        name: 'Pizza Pepperoni',
        id: 'pizza-pepperoni',
    }, {
        price: 12,
        name: 'Pizza 4 Fromaggi',
        id: 'pizza-fromaggi'
    }, {
        price: 8,
        name: 'Pizza BBQ',
        id: 'pizza-bbq'
    }]

    const [screenProps, setScreenProps] = React.useState(null);

    const navigateToCheckout = (screenProps) => {
        setScreenProps(screenProps)
    }

    const navigateBack = () => {
        setScreenProps(null);
    }

    return (
        <View style={styles.container}>
            {!screenProps &&
                <ProductsScreen
                    products={products}
                    navigateToCheckout={navigateToCheckout} />
            }
            {!!screenProps &&
                <CheckoutScreen
                    {...screenProps}
                    navigateBack={navigateBack} />
            }
        </View>
    )
}

const styles = StyleSheet.create({
  // ...
  buyButton: {
      backgroundColor: '#007DFF',
      paddingHorizontal: 32,
      paddingVertical: 16,
      borderRadius: 8,
  },
  textButton: {
      paddingHorizontal: 32,
      paddingVertical: 16,
      borderRadius: 8,
      color: '#007DFF'
  },
  selectButton: {
      borderColor: '#007DFF',
      paddingHorizontal: 32,
      paddingVertical: 16,
      borderRadius: 8,
      borderWidth: 2,
  },
  boldText: {
      fontSize: 17,
      fontWeight: '700'
  }
});

export default StripeScreen