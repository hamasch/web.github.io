(function(algolia){"use strict";var instantsearch=algolia.externals.instantsearch,algoliasearch=algolia.externals.algoliasearch,searchBox=algolia.externals.widgets.searchBox,stats=algolia.externals.widgets.stats,sortBy=algolia.externals.widgets.sortBy,clearRefinements=algolia.externals.widgets.clearRefinements,panel=algolia.externals.widgets.panel,hits=algolia.externals.widgets.hits,pagination=algolia.externals.widgets.pagination,configure=algolia.externals.widgets.configure,connectCurrentRefinements=algolia.externals.connectors.connectCurrentRefinements,aa=algolia.externals.aa,collectionPage=!!algolia.is_collection_results_page&&!!algolia.config.instant_search_enabled_on_collection;if(!algolia.full_results&&!collectionPage||!algolia.config.instant_search_enabled)return;var searchFilters=[],collectionFacetFilter=null,collectionRulesContextValue=null,collectionHandle=null;if(collectionPage){var matches=window.location.pathname.match(/\/collections\/([^/]+)/i);collectionHandle=matches&&matches.length===2?matches[1]:null,algolia.config.collection_id_indexing?collectionFacetFilter=algolia.current_collection_id?'collection_ids:"'+algolia.current_collection_id+'"':null:collectionFacetFilter='collections:"'+collectionHandle+'"',searchFilters.push(collectionFacetFilter),collectionRulesContextValue=algolia.config.collection_id_query_rules?algolia.current_collection_id:collectionHandle}var stockPolicyFilter=null;algolia.config.stock_policy&&(algolia.config.stock_policy==="allow"||(algolia.config.stock_policy==="deny"?stockPolicyFilter="inventory_quantity > 0":algolia.config.stock_policy==="continue"&&(stockPolicyFilter="inventory_available:true")),stockPolicyFilter&&searchFilters.push(stockPolicyFilter));var results_selector=collectionPage?algolia.config.collection_css_selector:algolia.config.results_selector,activeSortOrders=collectionPage&&algolia.collectionSortOrders?algolia.collectionSortOrders:algolia.sortOrders;results_selector+=", .algolia-shopify-instantsearch";function getTrackedUiState(uiState){var trackedUiState={};return Object.keys(uiState).forEach(function(k){k==="configure"||k==="query"||k==="q"||(trackedUiState[k]=uiState[k])}),trackedUiState}function singleIndex(indexName){return{stateToRoute:function(uiState){var route=getTrackedUiState(uiState[indexName]||{});return route.q=uiState[indexName].query,route},routeToState:function(routeState){var state={};return state[indexName]=getTrackedUiState(routeState||{}),state[indexName].query=routeState.q,state}}}var instant={colors:algolia.config.colors,distinct:!!algolia.config.show_products,facets:{hidden:collectionPage&&algolia.collectionHiddenFacets?algolia.collectionHiddenFacets:algolia.hiddenFacets,shown:collectionPage&&algolia.collectionShownFacets?algolia.collectionShownFacets:algolia.shownFacets,list:collectionPage&&algolia.collectionFacets?algolia.collectionFacets:algolia.facets,widgets:collectionPage&&algolia.collectionFacetsWidgets?algolia.collectionFacetsWidgets:algolia.facetsWidgets},hitsPerPage:collectionPage&&algolia.config.collections_full_results_hits_per_page?algolia.config.collections_full_results_hits_per_page:algolia.config.products_full_results_hits_per_page,poweredBy:algolia.config.powered_by,search:instantsearch({searchClient:algoliasearch(algolia.config.app_id,algolia.config.search_api_key),indexName:algolia.config.index_prefix+"products",routing:{stateMapping:singleIndex(algolia.config.index_prefix+"products")},searchFunction:function(searchFunctionHelper){var page=searchFunctionHelper.getPage();searchFunctionHelper.setQueryParameter("highlightPreTag",'<span class="ais-highlight">'),searchFunctionHelper.setQueryParameter("highlightPostTag","</span>"),instant.distinct&&searchFunctionHelper.setQueryParameter("distinct",!0),searchFilters.length&&searchFunctionHelper.setQueryParameter("filters",searchFilters.join(" AND ")),collectionPage&&(collectionRulesContextValue?searchFunctionHelper.setQueryParameter("ruleContexts",[collectionRulesContextValue.toString()]):searchFunctionHelper.setQueryParameter("ruleContexts",[])),searchFunctionHelper.setPage(page),searchFunctionHelper.search()}}),selector:results_selector+", .algolia-shopify-instantsearch",sortOrders:activeSortOrders,storeName:algolia.storeName,templates:{currentItem:algolia.getTemplate("instant_search_current_refined_values_item"),empty:algolia.getTemplate("instant_search_no_result"),page:algolia.compileTemplate("instant_search"),product:algolia.getTemplate("instant_search_product"),stats:algolia.getTemplate("instant_search_stats"),style:algolia.compileTemplate("instant_search.css")}};algolia.instantsearch=instant,instant.poweredBy&&console.log("Algolia: Instant-Search");function readjust(){var width=instant.$results.offsetWidth,suffix="lg";width<400?suffix="xs":width<800?suffix="sm":width<1200&&(suffix="md"),instant.$results.classList.remove("ais-results-size-xs"),instant.$results.classList.remove("ais-results-size-sm"),instant.$results.classList.remove("ais-results-size-md"),instant.$results.classList.remove("ais-results-size-lg"),instant.$results.classList.add("ais-results-size-"+suffix)}var helpers=algolia.assign({},algolia.helpers,algolia.translation_helpers);if(Object.keys(helpers).forEach(function(name){var helper=helpers[name];instant.search.templatesConfig.helpers[name]=helper}),instant.search.templatesConfig.compileOptions=algolia.hoganOptions,algolia.appendStyle(algolia.render(instant.templates.style,{distinct:instant.distinct,colors:instant.colors})),collectionPage){if(document.querySelectorAll(algolia.config.collection_css_selector).length===0)throw new Error("Instant search CSS selector for collection page is incorrect\nFor more info see: https://www.algolia.com/doc/integration/shopify/advanced-customization/collection-search-page/#css-selector")}else if(document.querySelectorAll(algolia.config.results_selector).length===0)throw new Error("Instant search CSS selector is incorrect\nFor more info see: https://www.algolia.com/doc/integration/shopify/building-search-ui/instant-search/#css-selector");instant.$results=document.querySelector(instant.selector),instant.$results.innerHTML=algolia.render(instant.templates.page,{facets:instant.facets.list,storeName:instant.storeName,translations:algolia.translations,multipleSortOrders:activeSortOrders.length>1}),readjust(),window.addEventListener("resize",function(){readjust()}),instant.search.addWidgets([{init:function(){var $button=document.querySelector(".ais-facets-button");$button.addEventListener("click",function(){var $facets=document.querySelector(".ais-facets");$facets.classList.contains("ais-facets__shown")?($button.textContent="Show filters",$facets.classList.remove("ais-facets__shown")):($button.textContent="Hide filters",$facets.classList.add("ais-facets__shown"))})}}]),instant.search.addWidgets([configure({hitsPerPage:instant.hitsPerPage,clickAnalytics:!0,facetingAfterDistinct:!!algolia.config.show_products})]),instant.search.addWidgets([searchBox({container:".ais-search-box-container",placeholder:algolia.translations.searchForProduct,showReset:!1,showSubmit:!1})]),instant.search.addWidgets([{init:function(opts){instant.poweredBy||(document.querySelector(".ais-algolia-icon").style.display="none"),document.querySelector(".ais-clear-input-icon").addEventListener("click",function(){opts.helper.setQuery("").search();var input=document.querySelector(".ais-search-box--input");input.value="",input.focus()})},render:function(opts){opts.state.query?(document.querySelector(".ais-clear-input-icon").style.display="",document.querySelector(".ais-algolia-icon").style.display="none"):(instant.poweredBy&&(document.querySelector(".ais-algolia-icon").style.display=""),document.querySelector(".ais-clear-input-icon").style.display="none")}}]),instant.search.addWidgets([stats({container:".ais-stats-container",templates:{text:instant.templates.stats}})]),activeSortOrders.length>1&&instant.search.addWidgets([sortBy({container:".ais-sort-orders-container",items:instant.sortOrders})]),instant.search.addWidgets([{init:function(){document.querySelector(".ais-search-header .ais-change-display-block").addEventListener("click",function(){document.querySelector(".ais-change-display-block:not(.ais-change-display-selected)").classList.add("ais-change-display-selected"),document.querySelector(".ais-change-display-list.ais-change-display-selected").classList.remove("ais-change-display-selected"),document.querySelector(".ais-results-as-list").classList.replace("ais-results-as-list","ais-results-as-block")}),document.querySelector(".ais-search-header .ais-change-display-list").addEventListener("click",function(){document.querySelector(".ais-change-display-list:not(.ais-change-display-selected)").classList.add("ais-change-display-selected"),document.querySelector(".ais-change-display-block.ais-change-display-selected").classList.remove("ais-change-display-selected"),document.querySelector(".ais-results-as-block").classList.replace("ais-results-as-block","ais-results-as-list")})}}]);var list=instant.facets.hidden.map(function(facet){return facet.name});instant.search.addWidgets([{getConfiguration:function(){return{facets:list,disjunctiveFacets:list}},init:function(){}}]);var createDataAttribtues=function(refinement){return Object.keys(refinement).map(function(key){return"data-"+key+'="'+refinement[key]+'"'}).join(" ")},renderListItem=function(item){var facet=instant.facets.list.find(function(f){return f.name===item.label});return item.refinements.map(function(refinement){return'<li class="ais-current-refined-values--item">  <a '+createDataAttribtues(refinement)+'    class="ais-current-refined-values--link">    <div>      <div class="ais-current-refined-values--label">'+facet.title+"      </div>: "+refinement.label+"    </div>  </a></li>"}).join("")},renderCurrentRefinements=function(renderOptions){var items=renderOptions.items,refine=renderOptions.refine,widgetParams=renderOptions.widgetParams;widgetParams.container.innerHTML='<div class="ais-current-refined-values--header ais-facet--header ais-header">Selected filters</div><div class="ais-root ais-current-refined-values ais-facet">  <ul class="ais-current-refined-values--list">'+items.map(renderListItem).join("")+"  </ul></div>",Array.prototype.slice.call(widgetParams.container.querySelectorAll(".ais-current-refined-values--link")).forEach(function(element){element.addEventListener("click",function(event){var item=Object.keys(event.currentTarget.dataset).reduce(function(acc,key){var itemData={};return itemData[key]=event.currentTarget.dataset[key],algolia.assign({},acc,itemData)},{});refine(item)})})},customCurrentRefinements=connectCurrentRefinements(renderCurrentRefinements),hasRefinements=function(helper,facetsList){return facetsList.some(function(f){var isConjunctiveFacetRefined=helper.state.isConjunctiveFacet(f.name)&&helper.state.isFacetRefined(f.name),isDisjunctiveFacetRefined=helper.state.isDisjunctiveFacet(f.name)&&helper.state.isDisjunctiveFacetRefined(f.name),isHierarchicalFacetRefined=helper.state.isHierarchicalFacet(f.name)&&helper.state.isHierarchicalFacetRefined(f.name),numericRefinements=helper.state.getNumericRefinements(f.name),isNumericFacetRefined=Object.keys(numericRefinements).some(function(operator){return numericRefinements[operator].length>0});return isNumericFacetRefined||isConjunctiveFacetRefined||isDisjunctiveFacetRefined||isHierarchicalFacetRefined})},customCurrentRefinementsWithPanel=panel({hidden:function(options){return!hasRefinements(options.helper,instant.facets.list)}})(customCurrentRefinements),clearRefinementsWithPanel=panel({hidden:function(options){return!hasRefinements(options.helper,instant.facets.list)}})(clearRefinements);instant.search.addWidgets([clearRefinementsWithPanel({container:document.querySelector(".ais-clear-refinements-container"),templates:{resetLabel:algolia.translations.clearAll}}),customCurrentRefinementsWithPanel({container:document.querySelector(".ais-current-refined-values-container")})]),instant.facets.widgets.forEach(function(widget){instant.search.addWidgets([widget.widget(widget.params)])}),instant.search.addWidgets([hits({container:".ais-hits-container",templates:{empty:instant.templates.empty,item:instant.templates.product},transformItems:function(products){return products.map(function(product){return algolia.assign({},product,{_distinct:instant.distinct,can_order:product.inventory_management!=="shopify"||product.inventory_policy==="continue"||product.inventory_quantity>0,translations:algolia.translations,queryID:product.__queryID,productPosition:product.__position,index:instant.search.mainIndex.getIndexName()})})}})]),instant.search.addWidgets([{init:function(){var container=document.querySelector(".ais-hits-container");container.addEventListener("click",function(e){var el=e.target,hit;do{if(el.matches(".ais-hit")){hit=el;break}el=el.parentNode}while(el&&el!==container);if(hit){var $this=hit,productHandle=$this.dataset.handle,variant_id=$this.dataset.variantId,distinct=$this.dataset.distinct,link="";if(collectionPage&&collectionHandle&&(link="/collections/"+collectionHandle),link=link+"/products/"+productHandle,distinct!=="true"&&(link+="?variant="+variant_id),algolia.config.analytics_enabled){var clickData={index:hit.dataset.algoliaIndex,eventName:"click",queryID:hit.dataset.algoliaQueryid,objectIDs:[hit.dataset.algoliaObjectid],positions:[Number(hit.dataset.algoliaPosition)]};aa.clickedObjectIDsAfterSearch(clickData),algolia.saveForConversionTracking(clickData)}window.location.href=link}})}}]),instant.search.addWidgets([{init:function(){var container=document.querySelector(".ais-hits-container");container.addEventListener("click",function(e){var el=e.target,cartButton;do{if(el.matches(".ais-hit--cart-button")){cartButton=el;break}el=el.parentNode}while(el&&el!==container);if(cartButton){e.stopPropagation();var $this=cartButton,formId=$this.dataset.formId;formId&&document.getElementById(formId).submit()}})}}]),instant.search.addWidgets([{init:function(opts){var container=document.querySelector(".ais-hits-container");container.addEventListener("click",function(e){var el=e.target,clearFilters;do{if(el.matches(".ais-hit-empty--clear-filters")){clearFilters=el;break}el=el.parentNode}while(el&&el!==container);if(clearFilters){var helper=opts.helper;helper.clearTags(),instant.facets.list.forEach(function(facet){helper.clearRefinements(facet.name)}),helper.search()}}),container.addEventListener("click",function(e){var el=e.target,clearInput;do{if(el.matches(".ais-hit-empty--clear-input")){clearInput=el;break}el=el.parentNode}while(el&&el!==container);if(clearInput){opts.helper.setQuery("").search();var input=document.querySelector(".ais-search-box--input");input.value="",input.focus()}})}}]),instant.search.addWidgets([pagination({container:".ais-pagination-container",padding:2,maxPages:20})]),instant.search.start(),algolia.contentHide.parentNode.removeChild(algolia.contentHide)})(window.algoliaShopify);
//# sourceMappingURL=/cdn/shop/t/205/assets/algolia_instant_search.js.map?v=126112730629828349621693505108