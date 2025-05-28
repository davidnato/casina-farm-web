
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface OrderItem {
  productId: string;
  productName: string;
  size: string;
  price: number;
  quantity: number;
}

interface InvoiceRequest {
  order: {
    id: string;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    delivery_address: string;
    total_amount: number;
    payment_method: string;
    created_at: string;
  };
  orderItems: OrderItem[];
  customerEmail: string;
  customerName: string;
}

const generateInvoiceHTML = (order: any, orderItems: OrderItem[]) => {
  const orderDate = new Date(order.created_at).toLocaleDateString();
  
  const itemsHTML = orderItems.map(item => `
    <tr style="border-bottom: 1px solid #e5e5e5;">
      <td style="padding: 12px; text-align: left;">${item.productName} (${item.size})</td>
      <td style="padding: 12px; text-align: center;">${item.quantity}</td>
      <td style="padding: 12px; text-align: right;">Ksh. ${item.price}</td>
      <td style="padding: 12px; text-align: right;">Ksh. ${item.price * item.quantity}</td>
    </tr>
  `).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Casina Farms Invoice</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; color: #333; }
        .header { text-align: center; margin-bottom: 30px; }
        .invoice-info { margin-bottom: 30px; }
        .customer-info { background: #f9f9f9; padding: 20px; margin-bottom: 30px; }
        .items-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
        .items-table th { background: #2d5016; color: white; padding: 12px; text-align: left; }
        .total-row { background: #f0f0f0; font-weight: bold; }
        .footer { text-align: center; margin-top: 40px; color: #666; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1 style="color: #2d5016; margin: 0;">CASINA FARMS</h1>
        <p style="color: #8b4513; margin: 5px 0;">Building Resilience on the Kenyan Coast</p>
        <h2 style="color: #2d5016;">INVOICE</h2>
      </div>

      <div class="invoice-info">
        <p><strong>Invoice #:</strong> ${order.id.substring(0, 8).toUpperCase()}</p>
        <p><strong>Order Date:</strong> ${orderDate}</p>
        <p><strong>Payment Method:</strong> ${order.payment_method.toUpperCase()}</p>
      </div>

      <div class="customer-info">
        <h3 style="margin-top: 0; color: #2d5016;">Customer Information</h3>
        <p><strong>Name:</strong> ${order.customer_name}</p>
        <p><strong>Email:</strong> ${order.customer_email}</p>
        <p><strong>Phone:</strong> ${order.customer_phone}</p>
        <p><strong>Delivery Address:</strong> ${order.delivery_address}</p>
      </div>

      <table class="items-table">
        <thead>
          <tr>
            <th>Product</th>
            <th style="text-align: center;">Quantity</th>
            <th style="text-align: right;">Unit Price</th>
            <th style="text-align: right;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHTML}
          <tr class="total-row">
            <td colspan="3" style="padding: 12px; text-align: right;">TOTAL AMOUNT:</td>
            <td style="padding: 12px; text-align: right;">Ksh. ${order.total_amount}</td>
          </tr>
        </tbody>
      </table>

      <div class="footer">
        <p>Thank you for choosing Casina Farms!</p>
        <p>For inquiries, contact us at info@casinafarms.com</p>
        <p style="font-size: 12px;">This is an automated invoice. Please keep this for your records.</p>
      </div>
    </body>
    </html>
  `;
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { order, orderItems, customerEmail, customerName }: InvoiceRequest = await req.json();

    console.log("Sending invoice for order:", order.id);

    const invoiceHTML = generateInvoiceHTML(order, orderItems);

    const emailResponse = await resend.emails.send({
      from: "Casina Farms <orders@casinafarms.com>",
      to: [customerEmail],
      subject: `Invoice for Your Order #${order.id.substring(0, 8).toUpperCase()}`,
      html: invoiceHTML,
    });

    console.log("Invoice email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending invoice:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
