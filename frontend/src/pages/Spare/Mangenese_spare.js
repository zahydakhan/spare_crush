import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { setTheme } from "../../redux/actions/themeActions";
import { useHistory } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

import Mangsparepart from "../../pages/spareparts/Mangsparepart.component";

import {
  Accordion as MuiAccordion,
  AccordionDetails as MuiAccordionDetails,
  AccordionSummary as MuiAccordionSummary,
  Button as MuiButton,
  Container,
  Grid,
  Typography as MuiTypography,
  withWidth,
} from "@material-ui/core";

import { isWidthUp } from "@material-ui/core/withWidth";

import { ExpandMore as ExpandMoreIcon } from "@material-ui/icons";

import { spacing } from "@material-ui/system";

const Spacer = styled.div(spacing);

const Typography = styled(MuiTypography)(spacing);

const TypographyMuted = styled(Typography)`
  color: ${(props) => props.theme.palette.grey[700]};
`;

const IntroductionBase = styled.div`
  padding: 0vw 0vw;
`;

const IntroductionContent = styled.div`
  padding: ${(props) => props.theme.spacing(6)}px;
  line-height: 150%;
`;

const IntroductionImage = styled.img`
  margin: ${(props) => props.theme.spacing(6)}px;
  max-width: 100%;
  height: auto;
  display: block;
  box-shadow: 0 6px 18px 0 rgba(18, 38, 63, 0.1);
`;

const IntroductionSubtitle = styled(Typography)`
  font-size: ${(props) => props.theme.typography.h5.fontSize};
  font-weight: ${(props) => props.theme.typography.fontWeightRegular};
  color: ${(props) => props.theme.palette.grey[800]};
  font-family: ${(props) => props.theme.typography.fontFamily};
  margin-bottom: ${(props) => props.theme.spacing(4)}px;
`;

const BrandIcons = styled.div(spacing);

const BrandIcon = styled.img`
  vertical-align: middle;
  margin: ${(props) => props.theme.spacing(1)}px;
  height: auto;
`;

const BrandIconStyledComponents = styled.span`
  font-size: 1.875rem;
  vertical-align: middle;
  margin: ${(props) => props.theme.spacing(1)}px;
  cursor: default;
`;

const DemoListContent = styled.div`
  ${spacing};
  background: ${(props) => props.theme.palette.common.white};
  text-align: center;
`;

const DemoContent = styled.div(spacing);

const DemoLink = styled.div`
  cursor: pointer;
`;

const DemoImage = styled.img`
  max-width: 100%;
  height: auto;
  display: block;
  box-shadow: 0 4px 12px 0 rgba(18, 38, 63, 0.125);
  transition: 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const JoinUsContent = styled.div`
  ${spacing};
  text-align: center;
`;

const FaqContent = styled(Typography)`
  ${spacing};
  background: ${(props) => props.theme.palette.common.white};
  text-align: center;
`;

const Accordion = styled(MuiAccordion)`
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 6px;
  box-shadow: 0;
  text-align: left;
  margin: 16px 0 !important;

  &:before {
    display: none;
  }
`;

const AccordionSummary = styled(MuiAccordionSummary)`
  padding: 0 16px;
  box-shadow: 0;
  min-height: 48px !important;

  .MuiAccordionSummary-content {
    margin: 12px 0 !important;
  }
`;

const AccordionDetails = styled(MuiAccordionDetails)`
  padding-left: 16px;
  padding-right: 16px;
`;

const Button = styled(MuiButton)(spacing);

function Introduction() {
  return (
    <IntroductionBase>
      <Grid alignItems='center' justify='center'>
        <Grid item>
          <Mangsparepart />
        </Grid>
      </Grid>
    </IntroductionBase>
  );
}

function Presentation({ width }) {
  return (
    <React.Fragment>
      <Introduction />
    </React.Fragment>
  );
}

export default withWidth()(Presentation);
