local isDraft = require(script.Parent.isDraft)
local constants = require(script.Parent.constants)

local BASE = constants.BASE
local CLONE = constants.CLONE

--[=[
	@within Immut
	@function current
	@param draft Draft
	@return table

	Returns a snapshot of the current state of a draft. This can be expensive,
	so use it sparingly.
]=]

--[=[
	@within Immut
	@param draft Draft
	@return table

	:::tip
	It's unlikely you'll need to use this unless you have a very specific use
	case. Try using `produce` instead!
	:::

	Finalize a draft.
]=]
local function finishDraft<T>(draft: T)
	local final = draft

	if isDraft(draft) then
		local clone = rawget(draft :: any, CLONE)
		if clone == nil then
			return rawget(draft :: any, BASE)
		else
			final = clone
		end
	end

	for key, value in final do
		if isDraft(value) then
			final[key] = finishDraft(value)
		end
	end

	return final :: T
end

return finishDraft
