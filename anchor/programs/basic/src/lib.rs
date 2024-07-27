use anchor_lang::prelude::*;

declare_id!("ERJtkYYrxrUcnjPj1Zfp63eSK6YDyPLtpcuhg5dSg1rE");

#[program]
pub mod basic {
    use super::*;

    pub fn greet(_ctx: Context<Initialize>) -> Result<()> {
        msg!("GM!");
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
