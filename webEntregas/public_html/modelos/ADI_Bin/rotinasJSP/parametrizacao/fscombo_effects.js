function animClipDown( ref, counter )
{
	if( !ref )
		return;
		
	var cP = Math.pow( Math.sin( Math.PI * counter / 200 ), 0.75 );
	ref.style.clip = ( counter == 100 ? ( ( window.opera || navigator.userAgent.indexOf( 'KHTML' ) > -1 ) ? '' : 'rect(auto, auto, auto, auto)' ) : 'rect(0, ' + ref.offsetWidth + 'px, ' + ( ref.offsetHeight * cP ) + 'px, 0)' );
};

function animFade( ref, counter )
{
	if( !ref )
		return;
		
	var f = ref.filters, done = ( counter == 100 );
	if (f)
	{
		if (!done && ref.style.filter.indexOf("alpha") == -1)
			ref.style.filter += ' alpha(opacity=' + counter + ')';

		else if (f.length && f.alpha)
		{
			with (f.alpha)
			{
				if (done)
					enabled = false;
				else
				{
					opacity = counter;
					enabled=true
				}
			}
		}
	}
	else
		ref.style.opacity = ref.style.MozOpacity = counter / 100.1;
};
