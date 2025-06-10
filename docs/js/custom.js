$(document).ready(initImageZoom)

// 每次頁面內容變動（如 mkdocs-material 前端路由切換）
if (window.MutationObserver) {
  new MutationObserver(function () {
    initImageZoom()
  }).observe(
    document.querySelector('main.md-main__inner') || document.body,
    { childList: true, subtree: true }
  )
}

function initImageZoom() {
  let productImageGroups = []
  // 先移除已經包裹過的 a.boxedThumb，避免重複包裹
  $('.img-fluid').each(function () {
    if (!$(this).parent('a.boxedThumb').length) {
      let productImageSource = $(this).attr('src')
      let productImageTag = $(this).attr('tag')
      let productImageTitle = $(this).attr('title')
      if (productImageTitle) {
        productImageTitle = 'title="' + productImageTitle + '" '
      }
      else {
        productImageTitle = ''
      }
      $(this).
        wrap('<a class="boxedThumb ' + productImageTag + '" ' +
          productImageTitle + 'href="' + productImageSource + '"></a>')
      productImageGroups.push('.' + productImageTag)
    }
  })
  jQuery.unique(productImageGroups)
  productImageGroups.forEach(productImageGroupsSet)

  function productImageGroupsSet(value) {
    $(value).simpleLightbox()
  }
}