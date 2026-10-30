export const validateEmail=value=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value||''));
export const validatePassword=value=>String(value||'').length>=8&&/[A-Z]/.test(value)&&/[a-z]/.test(value)&&/\d/.test(value)&&/[^A-Za-z0-9]/.test(value);
export const required=value=>String(value??'').trim().length>0;
export const numberRange=(value,min,max=Number.MAX_SAFE_INTEGER)=>value!==''&&Number.isFinite(Number(value))&&Number(value)>=min&&Number(value)<=max;
export const futureDate=value=>Boolean(value)&&new Date(value)>=new Date(new Date().toDateString());
export function attachLiveValidation(form,checks={}){form.addEventListener('input',()=>{for(const [name,check] of Object.entries(checks)){const el=form.elements[name];if(!el)continue;const ok=check(el.value,form);el.classList.toggle('field-error',!ok);const err=form.querySelector(`[data-error="${name}"]`);if(err)err.textContent=ok?'':(err.dataset.message||'Please check this field.')}const submit=form.querySelector('[type="submit"]');if(submit)submit.disabled=!form.checkValidity()})}
export function sanitize(value){return String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}