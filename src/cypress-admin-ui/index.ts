import { Rule, apply, applyTemplates, chain, mergeWith, url } from '@angular-devkit/schematics';

import { strings } from '@angular-devkit/core';

export function cypressAdminUi(): Rule {
  return async () => {
    const lists = [
      ['제품', 'product', '/product', 'Products'],
      ['재고 예측', 'product-stock-prediction-list', '/product/stock-prediction', 'productStockPredictions'],
      ['재고 조회', 'product-stock-manage-list', '/product/stock', 'ProductStocks'],
      ['EMP 재고 현황', 'inventory-list', '/inventory/list', 'inventories'],
      ['입고예정 목록', 'inbound-items', '/inbound', 'inboundItems'],
      ['입고 업체', 'company', '/company', 'companies'],
      ['상품 목록', 'goods-list', '/goods', 'Goodsz'],
      ['상품그룹', 'goods-group', '/goods/group', 'GoodsGroups'],
      ['상품진열', 'goods-display-list', '/goods-display', 'GoodsDisplays'],
      ['그룹코드', 'goods-display-group-create', '/goods-display/goods-display-group', 'GoodsDisplayGroups'],
      ['주문 전체 목록', 'order-list', '/order', 'Orders'],
      ['주문 아이템 전체 목록', 'order-item-list', '/order/item-list', 'orderGoodsItems'],
      ['환불 목록', 'order-refund-list', '/order/refund', 'orderRefunds'],
      ['배송지', 'delivery-address', '/order/delivery-address', 'DeliveryAddresses'],
      ['안분처리 이상 목록', 'abnormal-division', '/order/abnormal-division', 'AbnormalDivisionList'],
      ['발주 가능 목록', 'orderable-list', '/tpl/orderable-list', 'orderGoodsItems'],
      ['발주 대기 목록', 'transferable-list', '/tpl/transferable-list', 'TplOrderItems'],
      ['엑셀 발주 대기 목록', 'manual-transferable-list', '/tpl/manual-transferable-list', 'TplManualOrderItems'],
      ['[개발자] 발주 결과', 'transfer-result', '/tpl/transfer-result', 'TplOrders'],
      ['운송장 배정 수집', 'order-tracking-temp', '/tpl/order-tracking-temp', 'tplOrderTrackingTemps'],
      ['송장 전송 [플토]', 'playauto-invoice-send', '/playauto/invoice-send', 'PlayautoInvoices'],
      ['배송 확정 수집', 'order-release', '/tpl/order-release', 'TplOrderItems'],
      ['주문 대기 목록', 'playauto-order-list', '/playauto/order', 'PlayautoOrders'],
      ['미매칭 주문상품', 'playauto-order-goods-list', '/playauto/order-goods', 'PlayautoOrderGoodsz'],
      ['매핑 목록/삭제', 'playauto-goods-map', '/playauto/goods-map', 'PlayautoGoodsMaps'],
      ['대량 발주 등록', 'manual-order-pre', '/manual-order/pre', 'ManualOrders'],
      ['대량 발주 대기 목록', 'manual-order-list', '/manual-order', 'ManualOrders'],
      ['문의', 'cm-qna-list', '/community/cm-qna', 'CmQnas'],
      ['반품/교환', 'cm-cs-list', '/community/cm-cs', 'CmQnas'],
      ['리뷰', 'cm-review-list', '/community/cm-goods-review', 'CmGoodsReviews'],
      ['공지사항/이벤트', 'cm-notice', '/community/cm-notice', 'CmNotices'],
      ['이벤트 목록', 'event-list', '/promotion/event', 'Events'],
      ['쿠폰 목록', 'coupon-list', '/promotion/coupon/list', 'Coupons'],
      ['프로모션 목록', 'promotion-gift-list', '/promotion/gift', 'Promotions'],
      ['배너 목록', 'banner', '/management/banner', 'Banners'],

      ['배너 영역 목록', 'banner-group', '/management/banner/group', 'BannerGroups'],
      ['CS 목록', 'cs-board-list', '/cs-board/list', 'CsBoards'],
      ['유저 목록', 'user', '/user/management', 'Users'],
      ['발주요청 목록', 'b2b-order-list', '/b2b/order-list', 'B2bOrders'],
      ['입금확인 관리', 'b2b-pay-check', '/b2b/pay-check', 'B2bOrders'],
      ['공급가 관리', 'b2b-price-sales-management', '/b2b/price-sales-management', 'B2bProductList'],
      ['브랜드 공급 현황', 'b2b-brands-price-sales-status', '/b2b/brands-price-sales-status', 'B2bBrands'],
      ['업체목록', 'b2b-list', '/b2b/list', 'B2bs'],
      ['발주확정 내역 다운', 'coupang-purchase-list-down', '/coupang/purchase/down', 'CoupangPurchaseGroups'],
      ['출고내역', 'coupang-invoice', '/coupang/invoice', 'CoupangPurchases'],
      ['세금계산서 발행', 'coupang-taxbill', '/coupang/taxbill', 'CoupangTaxbills'],
      ['회송등록', 'coupang-return-upload', '/coupang/return/upload', 'CoupangPreReturns'],
      ['회송목록', 'coupang-return', '/coupang/return', 'CoupangReturnItems'],
      ['매출이전 관리', 'coupang-sales', '/coupang/sales', 'CoupangPurchases'],
      ['쿠팡 기본상품 목록', 'coupang-product-list', '/coupang/product', 'CoupangProducts'],
      // ['입고예정 목록', 'inbound-items', '/prismfs/inbound',''],
      ['입고예정 등록', 'inbound-reserve', '/prismfs/inbound/reserve', 'inboundItems'],
      ['요청 게시판', 'tpl-board', '/prismfs/board', 'tplBoards'],
      ['회수완료관리', 'tpl-order-return', '/prismfs/order-return', 'tplOrderReturns'],
      ['쿠팡 발주 패킹', 'coupang-purchase-list', '/prismfs/coupang', 'CoupangPurchaseGroups'],
      ['마일리지현황', 'mileage-list', '/data-lab/mileage-list', 'mileages'],
      ['전체 주문 제품 조회', 'payment-item-list', '/data-lab/payment-item-list', 'orderGoodsItems'],
      ['제품 별 집계', 'payment-group-list', '/data-lab/payment-group-list', 'OrderGoodsItemAggregateSUM'],
      ['몰/브랜드 별 집계', 'mall-brand-list', '/data-lab/mall-brand-list', 'OrderGoodsItemAggregateWithMall']
    ];

    function templateSource(e: any) {
      return apply(url('./files'), [
        applyTemplates({
          classify: strings.classify,
          dasherize: strings.dasherize,
          pathname: e[1].split('-')[0],
          name: e[1],
          pageName: e[0],
          pageUrl: e[2] + '/',
          gqlName: e[3]
        })
        // move(normalize(options.path || '')) // 이동 시킨다.
      ]);
    }

    return chain([...lists.map((item) => mergeWith(templateSource(item)))]);
  };
}
