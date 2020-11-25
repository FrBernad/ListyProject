class PaymentController {
    constructor(paymentService) {
        this.paymentService = paymentService;
    }

    async getMercadoPagoLink(req, res) {
        const { name, price, unit, img } = req.query;
        try {
            const checkout = await this.paymentService.createPaymentMercadoPago(
                name,
                price,
                unit,
                img
            );

            return res.redirect(checkout.init_point);

        } catch (err) {

            return res.status(500).json({
                error: true,
                msg: "Hubo un error con Mercado Pago"
            });
        }
    }

    webhook(req, res) {
        if (req.method === "POST") {
            let body = "";
            req.on("data", chunk => {
                body += chunk.toString();
            });
            req.on("end", () => {
                console.log(body, "webhook response");
                res.end("ok");
            });
        }
        return res.status(200);
    }

    // OPTIONS() {
    //     header('Access-Control-Allow-Origin: *');
    //     header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    //     header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
    //     header('content-type: application/json; charset=utf-8');
    // }
}

module.exports = PaymentController;

