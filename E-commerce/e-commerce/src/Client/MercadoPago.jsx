import React, { useEffect } from 'react';

const MercadoPagoPayment = ({ publicKey, preferenceId }) => {
  useEffect(() => {
    // Função para renderizar o Brick de pagamento
    const renderPaymentBrick = async () => {
      // Carregar o SDK do Mercado Pago
      const mp = new MercadoPago(publicKey, {
        locale: 'pt',
      });
      const bricksBuilder = mp.bricks();
      
      const settings = {
        initialization: {
          amount: 10000,
          preferenceId: preferenceId,
          payer: {
            firstName: "",
            lastName: "",
            email: "",
          },
        },
        customization: {
          visual: {
            style: {
              theme: "default",
            },
          },
          paymentMethods: {
            creditCard: "all",
            debitCard: "all",
            ticket: "all",
            bankTransfer: "all",
            atm: "all",
            onboarding_credits: "all",
            wallet_purchase: "all",
            maxInstallments: 1
          },
        },
        callbacks: {
          onReady: () => {
            // Callback chamado quando o Brick está pronto
          },
          onSubmit: ({ selectedPaymentMethod, formData }) => {
            return new Promise((resolve, reject) => {
              fetch("/process_payment", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
              })
                .then((response) => response.json())
                .then((response) => {
                  // Receber o resultado do pagamento
                  resolve();
                })
                .catch((error) => {
                  // Manejar a resposta de erro ao tentar criar um pagamento
                  reject();
                });
            });
          },
          onError: (error) => {
            // Callback chamado para todos os casos de erro do Brick
            console.error(error);
          },
        },
      };
      
      // Criar e renderizar o Brick de pagamento
      window.paymentBrickController = await bricksBuilder.create(
        "payment",
        "paymentBrick_container",
        settings
      );
    };

    // Executar a função para renderizar o Brick de pagamento
    renderPaymentBrick();
    
  }, [publicKey, preferenceId]); // Dependências do useEffect

  return (
    <div id="paymentBrick_container"></div>
  );
};

export default MercadoPagoPayment;
