{* pager3 *}
{require name="common:widget/pager/css/pager3.css"}
{require name="common:widget/pager/js/pager3.js"}
{script}
    require("common.widget.pager.js.pager3");
{/script}
{strip}
    <div class="gb-pager3-wrap clearfix">
        <div class="gb-pager3-right clearfix">
            {widget name="common:widget/pager/pager1.tpl" pagerid="js-gb-pager3-pagerid"}
        </div>
        <input type="hidden" id="js-gb-pager3-count" value="{$pagecount}" />
        <input type="hidden" id="js-gb-pager3-pagesize" value="{$pagesize}" />
        <input type="hidden" id="js-gb-pager3-pagenumber" value="{$pagenumber}" />
    </div>
{/strip}