{*分页1*}
{require name="common:widget/pager/css/pager1.css"}
{require name="common:widget/pager/pager.js"}
{script}
	require("common:widget/pager/pager.js");
{/script}
{strip}
<div id="{$pagerid}" class="gb-pager1"></div>
{/strip}