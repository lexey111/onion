import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import React, {ReactNode} from "react";
import {IconButton, styled} from "@mui/material";

type LayerProps = React.PropsWithChildren & {
	level: number
	title: string | ReactNode
	goBack?: () => void
}

const Title = styled('span')`
	font-weight: 100;
	width: 100%;
	text-align: center;
	font-size: 32px;
	color: ${({theme}) => theme.palette.text.secondary};

	&.no-bg {
		color: #fff;
	}
`

export const Layer: React.FC<LayerProps> = ({level, goBack, title, children}) => {
	return (
		<div className={`layer layer-${level}`}>
			{goBack && <div className="layer-drop" onClick={goBack}></div>}

			<div className="layer-header">
				{goBack &&
					<IconButton
						color={'primary'}
						onClick={goBack}
						sx={
							{
								marginLeft: 2,
							}
						}>
						<ArrowBackRoundedIcon sx={
							{
								width: '24px',
								height: '24px',
								color: (theme) => theme.palette.text.secondary
							}}/>
					</IconButton>}

				<Title className={level === 0 ? 'no-bg' : ''}>{title}</Title>
			</div>

			<div className="layer-content">
				{children}
			</div>
		</div>
	)
}
