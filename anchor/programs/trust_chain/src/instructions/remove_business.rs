use anchor_lang::prelude::*;

//use crate::errors::TrustChainError;
use crate::states::*;

pub fn remove_business(_ctx: Context<DeleteBusiness>, name: String) -> Result<()> {
    msg!("Business named {} deleted", name);
    Ok(())
}

#[derive(Accounts)]
#[instruction(name: String)]
pub struct DeleteBusiness<'info> {
    #[account(
        mut,
        seeds = [name.as_bytes(), owner.key().as_ref()],
        bump,
        close= owner,
    )]
    pub business_entry: Account<'info, BusinessEntryState>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}
