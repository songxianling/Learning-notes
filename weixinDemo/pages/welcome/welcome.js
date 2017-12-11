var app = getApp();

Page({
    onLoad() {
        wxbarcode.barcode('barcode', '1234567890123456789', 680, 200);
        alert(1);
    }
   
})
