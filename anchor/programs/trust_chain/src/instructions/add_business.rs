use anchor_lang::prelude::*;

use crate::errors::TrustChainError;
use crate::states::*;

pub fn add_business(
    ctx: Context<CreateBusiness>,
    name: String,
    address: String,
    profile: String,
    cover: String,
    latitude: i64,
    longitude: i64,
    category: String,
) -> Result<()> {
    let business_entry = &mut ctx.accounts.business_entry;

    require!(
        name.as_bytes().len() <= NAME_LENGTH,
        TrustChainError::NameTooLong
    );

    require!(
        address.as_bytes().len() <= ADDRESS_LENGTH,
        TrustChainError::AddressTooLong
    );

    require!(
        profile.as_bytes().len() <= PROFILE_LENGTH,
        TrustChainError::ProfileTooLong
    );

    require!(
        cover.as_bytes().len() <= COVER_LENGTH,
        TrustChainError::CoverTooLong
    );

    require!(
        category.as_bytes().len() <= CATEGORY_LENGTH,
        TrustChainError::CategoryTooLong
    );

    business_entry.owner = ctx.accounts.owner.key();
    business_entry.name = name;
    business_entry.address = address;
    business_entry.profile = profile;
    business_entry.cover = cover;
    business_entry.latitude = latitude;
    business_entry.longitude = longitude;
    business_entry.category = category;
    business_entry.created_at = Clock::get().unwrap().unix_timestamp;
    Ok(())
}

#[derive(Accounts)]
#[instruction(name: String)]
pub struct CreateBusiness<'info> {
    #[account(
        init,
        seeds = [name.as_bytes(), owner.key().as_ref()],
        bump,
        payer = owner,
        space = 8 + BusinessEntryState::INIT_SPACE,
    )]
    pub business_entry: Account<'info, BusinessEntryState>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}
